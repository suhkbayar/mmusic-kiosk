import React from 'react';
import dynamic from 'next/dynamic';
import BannerSkelton from './Skelton/BannerSkelton';
import CardSkelton from './Skelton/CardSkelton';
import ResultSkelton from './Skelton/ResultSkelton';
import DraftCardSkelton from './Skelton/DraftCardSkelton';
import ServiceSkelton from './Skelton/ServiceSkelton';
import NavigationSkelton from './Skelton/NavigationSkelton';
import ListCardSkelton from './Skelton/ListCardSkelton';

export const RestaurantContent = dynamic(() => import('../layouts/Content/restaurantContent'), {
  loading: () => <CardSkelton />,
  ssr: false,
});

export const MainContents = dynamic(() => import('../components/MainContent'), {
  ssr: false,
});

export const SideCategories = dynamic(() => import('../components/SideCategory'), {
  ssr: false,
});

export const BottomNavigation = dynamic(() => import('./BottomNavigation/BottomNavigation'), {
  loading: () => <NavigationSkelton />,
  ssr: false,
});

export const ListProduct = dynamic(() => import('./Cards/ListProductCard'), {
  loading: () => <ListCardSkelton />,
  ssr: false,
});

export const Banner = dynamic(() => import('../components/Banner/Banner'), {
  loading: () => <BannerSkelton />,
  ssr: false,
});

export const SmartBanner = dynamic(() => import('../components/Banner/SmartBanner'), {
  loading: () => <BannerSkelton />,
  ssr: false,
});

export const OrderHistory = dynamic(() => import('../components/History/OrderHistory'), {
  loading: () => <CardSkelton />,
  ssr: false,
});

export const OrderProcessingScreensaver = dynamic(() => import('../components/OrderProcessingScreensaver'), {
  ssr: false,
});

export const Header = dynamic(() => import('../layouts/Header/header'), {
  ssr: false,
});

export const AboutUsSidebar = dynamic(() => import('../components/SibeBar/AboutUs'), {
  ssr: false,
});
export const RecommendedCard = dynamic(() => import('./Cards/RecommendedCard'));
export const RecommendedSkelton = dynamic(() => import('./Skelton/RecommendedSkeleton'));
export const SearchInput = dynamic(() => import('../components/Input/Search'), {
  ssr: false,
});

export const RestaurantDescription = dynamic(() => import('../components/Informations/Restaurant'), {
  ssr: false,
});
export const FourDigits = dynamic(() => import('./Masks/FourDigitsMask'), {
  ssr: false,
});
export const StepNavigation = dynamic(() => import('../components/BottomNavigation/StepNavigation'), {
  ssr: false,
});

export const Button = dynamic(() => import('../components/Button/Button'), {
  ssr: false,
});
export const TimeTable = dynamic(() => import('../components/TimeTable/index'), {
  ssr: false,
});
export const Contacts = dynamic(() => import('../components/Informations/Contacts'), {
  ssr: false,
});
export const Evaluation = dynamic(() => import('../components/Evaluation/index'), {
  ssr: false,
});
export const SendFeedback = dynamic(() => import('../components/SibeBar/SendFeedBack'), {
  ssr: false,
});
export const FeedbackForm = dynamic(() => import('../components/Forms/Feedback'), {
  ssr: false,
});
export const ProductList = dynamic(() => import('../components/Products/ProductList'), {
  loading: () => <ResultSkelton />,
  ssr: false,
});
export const SearchProducts = dynamic(() => import('../components/SearchBar/SearchBarProducts'), {
  ssr: false,
});
export const SearchEmpty = dynamic(() => import('../components/Empty/Search'), {
  ssr: false,
});
export const ProductCard = dynamic(() => import('../components/Cards/ProductCard'), {
  ssr: false,
});
export const ProductModal = dynamic(() => import('../components/Modal/Product'), {
  ssr: false,
});
export const VariantCard = dynamic(() => import('../components/Cards/VariantCard'), {
  ssr: false,
});
export const OptionCard = dynamic(() => import('../components/Cards/OptionCard'), {
  ssr: false,
});
export const OptionValuesModal = dynamic(() => import('../components/Modal/OptionValues'), {
  ssr: false,
});
export const OrderTotalButton = dynamic(() => import('../components/Button/OrderTotalBotton'), {
  ssr: false,
});
export const DraftItemsModal = dynamic(() => import('../components/Modal/DraftItemsModal'), {
  ssr: false,
});
export const DraftItemCard = dynamic(() => import('../components/Cards/DraftItemCard'), {
  loading: () => <DraftCardSkelton />,
  ssr: false,
});

export const DraftOrderItems = dynamic(() => import('../components/Cards/DraftOrderItems'), {
  loading: () => <DraftCardSkelton />,
  ssr: false,
});

export const WaiterModal = dynamic(() => import('../components/Modal/WaiterModal'), {
  ssr: false,
});
export const CommentModal = dynamic(() => import('../components/Modal/CommentModalt'), {
  ssr: false,
});
export const AdultsOnlyModal = dynamic(() => import('../components/Modal/AdultsOnlyModal'), {
  ssr: false,
});
export const WaitPaymentModal = dynamic(() => import('../components/Modal/WaitPayment'), {
  ssr: false,
});
export const XasModal = dynamic(() => import('./Modal/XasModal'), {
  ssr: false,
});
export const MPostModal = dynamic(() => import('./Modal/MposModal'), {
  ssr: false,
});

export const PayCashierModal = dynamic(() => import('../components/Modal/PayCashier'), {
  ssr: false,
});
export const SuccesOrderModal = dynamic(() => import('../components/Modal/SuccessOrder'), {
  ssr: false,
});
export const ConfirmNewOrderModal = dynamic(() => import('../components/Modal/ConfirmNewOrder'), {
  ssr: false,
});

export const Dining = dynamic(() => import('../components/OrderServices/Dining'), {
  loading: () => <ServiceSkelton />,
  ssr: false,
});
export const PreOrder = dynamic(() => import('../components/OrderServices/PreOrder'), {
  loading: () => <ServiceSkelton />,
  ssr: false,
});
export const Delivery = dynamic(() => import('../components/OrderServices/Delivery'), {
  loading: () => <ServiceSkelton />,
  ssr: false,
});
export const TakeAway = dynamic(() => import('../components/OrderServices/TakeAway'), {
  loading: () => <ServiceSkelton />,
  ssr: false,
});

export const PreOrderForm = dynamic(() => import('../components/Forms/PreOrder'), {
  ssr: false,
});
export const DeliveryForm = dynamic(() => import('../components/Forms/Delivery'), {
  ssr: false,
});
export const TakeAwayForm = dynamic(() => import('../components/Forms/TakeAway'), {
  ssr: false,
});
export const VatForm = dynamic(() => import('../components/Forms/Vat'), {
  ssr: false,
});

export const TotalDescription = dynamic(() => import('./Order/PayOrder/TotalDescription'), {
  ssr: false,
});
export const InfoAlert = dynamic(() => import('../components/Alerts/InfoAlert'), {
  ssr: false,
});
export const PaymentBotton = dynamic(() => import('../components/Button/PaymentButton'), {
  ssr: false,
});
export const PaymentHeader = dynamic(() => import('../components/Order/PayOrder/PaymentHeader'), {
  ssr: false,
});

export const QpayForm = dynamic(() => import('../components/Forms/PaymentForms/Qpay'), {
  ssr: false,
});
export const BankFrom = dynamic(() => import('../components/Forms/PaymentForms/Bank'), {
  ssr: false,
});
export const IpposForm = dynamic(() => import('../components/Forms/PaymentForms/Ippos'), {
  ssr: false,
});
export const XasForm = dynamic(() => import('./Forms/PaymentForms/Xas'), {
  ssr: false,
});
export const MposForm = dynamic(() => import('./Forms/PaymentForms/Mpos'), {
  ssr: false,
});
export const OrderPrint = dynamic(() => import('../components/Print/Order'), {
  ssr: false,
});
export const Empty = dynamic(() => import('../components/Empty/Empty'), {
  ssr: false,
});
export const OrderInfo = dynamic(() => import('../components/Info/OrderInfo'), {
  ssr: false,
});

export const AnimatedBackground = dynamic(() => import('../layouts/Content/AnimateBackground'), {
  ssr: false,
});

export const ModalHeader = dynamic(() => import('../layouts/Header/modalHeader'), {
  ssr: false,
});

export const SuccessInfo = dynamic(() => import('../components/Info/SuccessInfo'), {
  ssr: false,
});
