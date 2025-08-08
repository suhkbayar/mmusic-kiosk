import useSound from 'use-sound';
import { IMenuCategory } from '../../types';
import { SOUND_LINK } from '../../constants/constant';
import { Translate } from 'react-auto-translate';
import { Icons } from '../../assets/category/icons';

type Props = {
  categories: IMenuCategory[];
  selectedCategoryId: string;
  logo: string;
  handleCategorySelect: (categoryId: string) => void;
};

const SideCategory = ({ categories, selectedCategoryId, handleCategorySelect, logo }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  return (
    <aside
      id="default-sidebar"
      className="fixed  top-[256] left-0  z-10 w-[10rem] bg-gray-100 h-screen transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto   ">
        <ul className="space-y-2 font-medium">
          <li className="mb-12 justify-items-center">
            <img src={logo} className="w-32 h-32 object-cover rounded-2xl max-w-xl" alt="Logo" />
          </li>
          {categories.map((category) => {
            let Icon: any;

            Icon = Icons[category.icon] ?? Icons['icon70'];

            return (
              <li key={category.id}>
                <div
                  onClick={() => {
                    play();
                    handleCategorySelect(category.id);
                  }}
                  className={`grid justify-items-center cursor-pointer button items-center p-2 py-4 rounded-3xl ${
                    selectedCategoryId === category.id ? 'bg-macDonald 0 text-gray-900 ' : 'text-gray-900  bg-gray-50 '
                  }`}
                >
                  {category.icon && Icon && (
                    <div className="h-14	 w-14">
                      <Icon />
                    </div>
                  )}
                  <span
                    className={` mt-2  text-center font-bold text-gray-600 text-xl `}
                    style={{
                      lineHeight: '26px',
                    }}
                  >
                    <Translate>{category.name} </Translate>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideCategory;
