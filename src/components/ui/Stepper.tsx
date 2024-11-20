import { Fragment, ComponentType, SVGProps } from 'react'
import StepsButton from './StepsButton';

interface IStep {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}

interface IStepper {
  steps: IStep[];
  step: number;
  setStep: (step: number) => void;
}

const Stepper = ({ steps, step, setStep,} : IStepper) => {
  return (
    <section className="flex items-center justify-center">
      {steps.map(({ icon: Icon, title }, index) => (
        <Fragment key={index + 1}>
          <StepsButton
            index={index + 1}
            step={step}
            setStep={setStep}
            icon={
              <Icon 
                className={`stroke-2 ${ step < index + 1 ? "stroke-gray-500":"stroke-white"}`}
              />
            } 
            title={title}
            length={steps.length}
          />
        </Fragment>
      ))}  
    </section>
  )
}

export default Stepper