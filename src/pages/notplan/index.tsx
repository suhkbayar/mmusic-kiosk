import AnimatedBackground from '../../layouts/Content/AnimateBackground';
import logo from '../../assets/images/newQ.png';
import error from '../../assets/images/unHappy.svg';

const NotPlan = () => {
  return (
    <div className="h-screen bg-[rgba(254,202,66,0.3)]">
      <div className="absolute bottom-0 z-40 w-full items-center justify-center">
        <img src={logo.src} className="justify-self-center w-32" alt="Logo" />
      </div>
      <div className=" flex flex-col items-center justify-center h-full  ">
        <div className=" items-center place-content-center flex gap-10">
          <div className="grid justify-center justify-items-center">
            <img src={error.src} alt="Error" />
            <span className="flex w-full text-xl text-misty font-semibold items-center text-center">
              Таны эрхийн хугацаа дууссан байна. <br />
              Төлбөрөө төлж сунгалтаа хийнэ үү. <br />
            </span>
          </div>
        </div>
      </div>

      <AnimatedBackground isWhite={false} />
    </div>
  );
};

export default NotPlan;
