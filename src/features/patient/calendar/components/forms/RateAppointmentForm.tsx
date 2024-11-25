import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createReview } from "../../services/patient.services"
import { useDrawerStore } from "@stores/drawer.store"
import { usePatientStore } from "../../stores/patient.store"
import { ReviewType } from "../../types/patient.types"
import { useState } from "react"
import DrawerHeader from "@components/shared/DrawerHeader"
import Button from "@components/ui/Button"
import Avatar from "@components/ui/Avatar"
import StarIcon from "@icons/linear/StarIcon"
import TextArea from "@components/ui/TextArea"
import Label from "@components/ui/Label"
import MotionNumber from 'motion-number'

const RateAppointmentForm = () => {
  const queryClient = useQueryClient()
  const selectedAppointment = usePatientStore((state) => state.selectedAppointment)
  const setExtraDrawerOpen = useDrawerStore((state) => state.setExtraDrawerOpen)
  const setDrawerOpen = useDrawerStore((state) => state.setDrawerOpen)
  const setIsLoading = useDrawerStore((state) => state.setIsLoading)
  const isLoading = useDrawerStore((state) => state.isLoading)

  const [data, setData] = useState<ReviewType>({
    reviewAppointmentId: selectedAppointment.appointmentData._id,
    reviewComment: "",
    reviewRating: 0
  })

  const dentistData = selectedAppointment.dentistData

  
  const handleCloseRating = () => {
    setExtraDrawerOpen(false)
    setTimeout(() => {
      setDrawerOpen(true)
    }, 300)
  }

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true)
      await createReview(data)
    }, 
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: () => {
      setExtraDrawerOpen(false)
      queryClient.removeQueries({queryKey: ["appointmentRatings"]})
    }
  });
  

  const isDisabled = data.reviewRating === 0 || isLoading

  return (
    <article className="flex flex-col w-full h-full">
      <DrawerHeader 
        title="Add a Review"
        handleClose={handleCloseRating}
      />  
      <section className="flex flex-col items-center justify-start w-full h-full gap-6 overflow-y-scroll py-1">
        <div className="px-6 pt-6 flex flex-col gap-4 items-center justify-center h-fit w-full">
          <Avatar 
            name={dentistData.dentistFullName}
            src={dentistData.dentistAvatar}
            size="3xl" 
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-medium text-gray-700">Dr. {dentistData.dentistFullName}</h1>
            <label className="text-sm text-gray-500 ring-1 ring-gray-200 rounded-md px-2 py-1">{dentistData.dentistSpecialization}</label>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center h-fit w-full my-6">
          <h1 className="text-4xl font-medium text-gray-700 mb-2">
            <MotionNumber
              value={data.reviewRating}
              format={{
                notation: 'compact',
                style: 'decimal',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
              }}              
              locales="en-US" // Intl.NumberFormat() locales
            />   
          </h1>
          <div className="flex gap-2 items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="relative flex items-center justify-center"
                onClick={() => setData({
                  ...data,
                  reviewRating: star
                })}
                aria-label={`Rate ${star} stars`}
              >
                <StarIcon
                  className={`h-16 w-16 transition-all duration-300 ease-in-out
                    ${data.reviewRating >= star ? 'fill-yellow-400 hover:fill-yellow-300' : 'fill-gray-200 hover:fill-gray-100'}
                  `}
                />
                <span
                  className={`absolute text-xs font-semibold text-white top-1 right-1 ${
                    data.reviewRating >= star ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-200`}
                >
                  {star}
                </span>
              </button>
            ))}
          </div>
          <label className="text-lg font-medium text-gray-700 mt-4"> How was your dental experience?</label>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full mt-4 p-6 border-t border-gray-200">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-base font-medium text-gray-700">
              Tell us your experience
              <span className="text-sm text-gray-500"> (Optional)</span>
            </h1>
            <Label >{data.reviewComment.length}/200</Label>
          </div>
          <TextArea 
            maxLength={200}
            className="w-full" 
            placeholder="Write your review here"
            value={data.reviewComment}
            onChange={(e) => setData({
              ...data,
              reviewComment: e.target.value
            })}
          />
        </div>
      </section>
      <section className="flex gap-4 items-center justify-center h-fit p-6 border-t w-full border-gray-200">
        <Button 
          variant="secondary"
          onClick={handleCloseRating}
          className="w-1/2"
        >
          Close
        </Button>
        <Button
          variant={isDisabled ? "disabled" : "primary" }
          className="w-full"
          disabled={isDisabled}
          onClick={() => mutation.mutate()}
        >
          Submit
        </Button>
      </section>
    </article>
    )
}

export default RateAppointmentForm
