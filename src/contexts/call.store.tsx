import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { IParticipant } from '../types/participant';
import { ICustomerOrder, IOrderItem } from '../types/order';
import { IMenuVariant } from '../types/menu';
import { generateUUID } from '../tools/generate';
import { isEmpty } from 'lodash';
import { IUser } from '../types/user';
import { IConfig } from '../types';
import { kioskConfigs } from '../constants/constant';
import { parseConfig } from '../utils';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface ICallStore {
  order: ICustomerOrder;
  user: IUser;
  config: IConfig;
  setUser: (user: IUser) => void;
  participant: IParticipant;
  calculate: () => void;
  removeOrder: () => void;
  removeOrderItem: (uuid: string) => void;
  addOrderItemComment: (item: IOrderItem, comment: string) => void;
  addOrderItem: (item: IOrderItem) => void;
  addOrderItemOptional: (item: IOrderItem) => void;
  add: (variant: IMenuVariant, productId?: string) => void;
  remove: (variant: IMenuVariant) => void;
  load: (order: ICustomerOrder) => void;
  setParticipant: (participant: IParticipant) => void;
}

export const useCallStore = create<ICallStore>(
  persist(
    (set, get) => ({
      order: null,
      user: null,
      config: null,
      participant: undefined,

      calculate: () => {
        const order = get().order;
        let totalAmount = 0;
        let totalQuantity = 0;

        for (let item of order?.items) {
          let optionPrices = isEmpty(item?.options) ? [] : item.options?.map((option) => option.price);
          if (item.state !== 'RETURN') {
            const itemTotal =
              Math.abs((optionPrices?.reduce((a: any, b: any) => a + b, 0) || 0) + item.price) * item.quantity;
            totalAmount += itemTotal;
            totalQuantity += item.quantity;
          }
        }

        set((state) => set({ order: { ...state.order, totalAmount, grandTotal: totalAmount, totalQuantity } }));
      },
      setUser: (user) => {
        set({ user: user });
      },
      addOrderItem: (orderItem) => {
        const index = get().order?.items.findIndex((item) => item.state === 'DRAFT' && item.id === orderItem.id);
        if (index > -1) {
          set((state) => ({
            order: {
              ...state.order,
              items: state.order?.items.map((item) =>
                item.state === 'DRAFT' && item.id === orderItem.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            },
          }));
        } else {
          set((state) => ({
            order: {
              ...state.order,
              items: [...state.order?.items, orderItem],
            },
          }));
        }
        get().calculate();
      },

      addOrderItemComment: (item, comment) => {
        const index = get().order?.items.findIndex((orderItem) => orderItem.id === item.id);

        if (index > -1) {
          set((state) => ({
            order: {
              ...state.order,
              items: state.order?.items.map((orderItem, i) => {
                if (i === index) {
                  return {
                    ...orderItem,
                    comment: comment,
                  };
                } else {
                  return orderItem;
                }
              }),
            },
          }));
        } else {
          console.log('Order item not found.');
        }
        get().calculate();
      },

      addOrderItemOptional: (orderItem) => {
        set((state) => ({
          order: {
            ...state.order,
            items: [...state.order?.items, orderItem],
          },
        }));
        get().calculate();
      },
      load: (order) => set({ order }),
      add: (variant: any, productId: string) => {
        if (get().order?.state === 'COMPLETED') return;
        const index = get().order?.items.findIndex((item) => item.state === 'DRAFT' && item.id === variant.id);
        if (index > -1) {
          set((state) =>
            set({
              order: {
                ...state.order,
                items: state.order?.items.map((item) =>
                  item.state === 'DRAFT' && item.id === variant.id ? { ...item, quantity: item.quantity + 1 } : item,
                ),
              },
            }),
          );
        } else {
          const item: IOrderItem = {
            id: variant.id,
            uuid: generateUUID(),
            productId: productId,
            name: variant.name,
            reason: '',
            state: 'DRAFT',
            quantity: 1,
            options: isEmpty(variant.options) ? [] : variant.options,
            price: variant.salePrice,
            discount: 0,
            image: '',
          };
          set((state) => set({ order: { ...state.order, items: [...state.order?.items, item] } }));
        }
        get().calculate();
      },

      removeOrderItem: (uuid: string) => {
        set((state) =>
          set({
            order: {
              ...state.order,
              items: state.order?.items.filter((item) => item.uuid !== uuid),
            },
          }),
        );
        get().calculate();
      },
      remove: (variant: any) => {
        set((state) => {
          const updatedItems = state.order?.items
            .map((item) => {
              if (item.productId === variant.productId) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);
          return { ...state, order: { ...state.order, items: updatedItems } };
        });
        get().calculate();
      },
      removeOrder: () => {
        set({
          order: {
            items: [],
            totalAmount: 0,
            grandTotal: 0,
            totalQuantity: 0,
            state: '',
            type: null,
            buyer: null,
            register: null,
            vatType: null,
          },
        });
      },
      setParticipant: (participant) => {
        const mappedConfigs = (participant.configs || []).reduce((acc, config) => {
          const matchedQMenuConfig = kioskConfigs.find((qconfig) => qconfig.value === config.name);
          if (matchedQMenuConfig) {
            acc[matchedQMenuConfig.name] = parseConfig(config.value);
          }
          return acc;
        }, {});

        set({ config: { ...mappedConfigs } });

        set({ participant: participant });
      },
    }),
    {
      name: 'call-storage-array',
      getStorage: () => storage,
    },
  ),
);
