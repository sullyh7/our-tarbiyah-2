import AnimatedDiv from '../AnimatedDiv'
import { cn } from '@/lib/utils'

interface FormStepProps {
    currentStep: number
    step: number,
    children: React.ReactNode
    className?: string,
}
const FormStep = ({ currentStep, step, className,  children }: FormStepProps) => {
  return (
    <AnimatedDiv direction='leftfast' className={cn(step !== currentStep ? "hidden" : "flex", className)}>
        {children}
    </AnimatedDiv>
  )
}

export default FormStep