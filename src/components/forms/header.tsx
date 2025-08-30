import Image from "next/image";
import closeIcon from "../../../public/assets/images/icon-close-modal.svg";

type HeaderProps = {
  onClose: () => void;
  closeButtonTestId?: string;
  heading: string;
};

const FormHeader = ({ onClose, closeButtonTestId, heading }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <p
        data-testid="heading"
        className="text-[#201F24] font-bold text-[2rem] capitalize"
      >
        {heading}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        data-testid={closeButtonTestId}
        className="cursor-pointer"
      >
        <Image src={closeIcon} alt="close-icon" width={32} height={32} />
      </button>
    </div>
  );
};

export default FormHeader;
