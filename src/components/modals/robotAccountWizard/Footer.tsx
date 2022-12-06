import {
  Button,
  WizardContextConsumer,
  WizardFooter,
} from '@patternfly/react-core';

export default function Footer(props: FooterProps) {
  return (
    <WizardFooter>
      <WizardContextConsumer>
        {({
          activeStep,
          goToStepByName,
          goToStepById,
          onNext,
          onBack,
          onClose,
        }) => {
          return (
            <>
              <Button variant="primary" type="submit" onClick={onNext}>
                Next
              </Button>
              {activeStep.name != 'Robot name and description' ? (
                <Button variant="secondary" type="submit" onClick={onBack}>
                  Back
                </Button>
              ) : (
                ''
              )}
              {activeStep.name == 'Robot name and description' ||
              activeStep.name == 'Review and Finish' ? (
                <Button variant="secondary" onClick={props.onSubmit}>
                  Review and Finish
                </Button>
              ) : null}
              <Button variant="link" onClick={onClose}>
                Cancel
              </Button>
            </>
          );
        }}
      </WizardContextConsumer>
    </WizardFooter>
  );
}

interface FooterProps {
  onSubmit: () => void;
}
