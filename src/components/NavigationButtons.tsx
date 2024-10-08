import { Button } from 'antd';
import { useMultiStep } from '../context/multiStep';
import { Steps } from '../interfaces/enums';
import { animateScroll } from 'react-scroll';
import { useState } from 'react';
import { useModal } from '../context/modal';

interface NavigationButtonsProps {
  isOnlyNext?: boolean;
  disabled?: boolean;
  loading?: boolean;
  handleNext?: () => Promise<any>;
}

function NavigationButtons({
  isOnlyNext,
  disabled,
  handleNext = () =>
    new Promise((res) => {
      res(true);
    }),
}: NavigationButtonsProps) {
  const { showModal } = useModal();
  const { updateCurrentStep } = useMultiStep();

  const [loading, setLoading] = useState<boolean>(false);

  const navigateToPreviousStep = () => {
    updateCurrentStep((prevStep: Steps) => prevStep - 1);
    animateScroll.scrollToTop();
  };

  const navigateToNextStep = async () => {
    try {
      setLoading(true);

      const isValidForm = await handleNext();
      setLoading(false);
      if (!isValidForm) return;

      animateScroll.scrollToTop();

      updateCurrentStep((prevStep: Steps) => prevStep + 1);
    } catch (error) {
      console.error('Error: ', error);

      setLoading(false);
      showModal();
    }
  };

  return (
    <div className={`w-full flex align-center justify-${isOnlyNext ? 'end' : 'between'} mt-6`}>
      {!isOnlyNext && (
        <Button type="default" onClick={navigateToPreviousStep} style={{ background: 'transparent' }}>
          Atrás
        </Button>
      )}
      <Button type="primary" disabled={disabled} loading={loading} onClick={navigateToNextStep}>
        Siguiente
      </Button>
    </div>
  );
}

export default NavigationButtons;
