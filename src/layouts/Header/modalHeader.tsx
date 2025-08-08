import ToggleLanguage from '../../components/Button/ToggleLanguage';
import { useCallStore } from '../../contexts/call.store';

const Index = () => {
  const { participant } = useCallStore();

  return (
    <div className="flex justify-between		 gap-4 mb-4	">
      <div className="   text-start    flex place-content-start">
        <img src={participant?.branch.logo} className="w-36 h-full object-cover rounded-2xl max-w-xl" alt="Logo" />
      </div>

      <div className="    text-end    flex place-content-end">
        <div className="w-36 place-content-center">
          <ToggleLanguage />
        </div>
      </div>
    </div>
  );
};

export default Index;
