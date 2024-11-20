import { getPaymentStatus, getStatusStyle } from "../../utils/color.utils";
import { usePaymentStore } from "../../stores/payment.store";
import { formatISODateWithStringWithSuffix } from "@features/shared/calendar/utils/calendar.utils";
import DrawerHeader from "@components/shared/DrawerHeader";
import PhilippinePesoIcon from "@icons/linear/PhilippinePesoIcon";
import NoteIcon from "@icons/linear/NoteIcon";
import CalendarIcon from "@icons/linear/CalendarIcon";
import { formatPaymentMethod } from "../../utils/formatter";
import { paymentLogoMap } from "../../constants/payment.constants";
import MoneyIcon from "@icons/linear/MoneyIcon";

const PaymentHistorySheet = () => {
  const selectedPayment = usePaymentStore((state) => state.selectedPayment);
  const setPaymentActiveSheets = usePaymentStore((state) => state.setPaymentActiveSheets);

  const latestPayment = {
    paymentAmount: selectedPayment.paymentAmount,
    paymentStatus: selectedPayment.paymentStatus,
    paymentMethod: selectedPayment.paymentMethod,
    paymentAppointmentId: selectedPayment.paymentAppointmentId,
    paymentNotes: selectedPayment.paymentNotes,
    paymentTotalCost: selectedPayment.paymentTotalCost,
    paymentSerialId: selectedPayment.paymentSerialId,
    createdAt: selectedPayment.createdAt,
    updatedAt: selectedPayment.updatedAt
  };

  const paymentHistory = selectedPayment.paymentHistory.map((payment) => {
    return {
      paymentAmount: payment.paymentAmount,
      paymentStatus: payment.paymentStatus,
      paymentMethod: payment.paymentMethod,
      paymentAppointmentId: payment.paymentAppointmentId,
      paymentNotes: payment.paymentNotes,
      paymentTotalCost: payment.paymentTotalCost,
      paymentSerialId: payment.paymentSerialId,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    };
  });

  const paymentList = [ latestPayment, ...paymentHistory];

  const handleClose = () => {
    setPaymentActiveSheets((prev) =>
      prev.filter((sheet) => sheet.name !== "ExtraSheet1")
    );
  };


  return (
    <main className="flex flex-col w-full h-full">
      <DrawerHeader title="Payment History" handleClose={handleClose} isLoading={false} />
      <article className="flex flex-col h-full w-full overflow-hidden rounded-b-3xl">
        <section className="flex flex-col flex-1 overflow-y-scroll p-6 gap-6">
          {paymentList.map((payment, index) => {
            const date = new Date(payment.updatedAt);
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();
            const style = getStatusStyle(payment.paymentStatus);
            const status = getPaymentStatus(payment.paymentStatus);

            const amountPaid = payment.paymentAmount;
            const totalCost = payment.paymentTotalCost - paymentList.slice(index + 1).reduce((acc, curr) => acc + curr.paymentAmount, 0);
            const remainingBalance = totalCost - payment.paymentAmount;

            const notes = payment.paymentNotes;
            const method = formatPaymentMethod(payment.paymentMethod);

            return (
              <div key={index} className="flex items-start justify-start h-fit gap-4">
                <div className="flex flex-col items-center gap-1 w-fit h-full flex-shrink-0 pr-6">
                  <label className="text-sm uppercase text-green-500">{month}</label>
                  <label className="text-md flex-shrink-0 font-semibold text-white rounded-full p-1 w-8 h-8 flex items-center justify-center bg-green-500 relative">
                    <hr className="absolute border-[1px] rounded-full -right-6 w-4 border-green-500" />
                    {day}
                  </label>
                  <div className="h-full bg-green-500 rounded-3xl w-1" />
                </div>
                <div className="ring-1 ring-gray-200 bg-gray-50 w-full h-fit rounded-md flex flex-col gap-1">
                  <div className={`ring-1 ring-gray-200 bg-white p-4  flex flex-col gap-1 ${notes ? "rounded-t-md" : "rounded-md"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 flex items-center justify-start gap-2">
                        <label className="text-gray-500">Payment ID</label>
                        <h1 className="text-xl text-gray-700 font-medium">#{payment.paymentSerialId}</h1>
                      </div>
                      <span className={`${style} px-2 py-1 rounded-full uppercase text-xs`}>
                        {status}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between mb-4 mt-2">
                      <div className="flex items-center">
                        {method === "Cash" ? (
                          <figure className="flex items-center justify-start w-11 h-6 rounded-md ">
                            <MoneyIcon className="w-7 h-7 stroke-[1.5]  stroke-white fill-gray-500" />
                          </figure>                      
                        ) : (
                          <img src={paymentLogoMap[method]} className="w-10 aspect-square flex items-start py-2 pr-4" alt={`${method} Logo`} />
                        )}
                        <label className="text-gray-700 text-base font-medium">{method}</label>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <CalendarIcon className="stroke-2 stroke-gray-500 w-4 h-4" />
                        <label className="text-gray-500 text-sm font-medium">
                          {formatISODateWithStringWithSuffix(payment.createdAt)}
                        </label>
                      </div>

                    </div>
                    <div className="flex w-full items-center justify-between">
                      <label className="text-gray-500 text-sm">Amount Paid</label>
                      <div className="flex items-center justify-center">
                        <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
                        <label className="text-gray-700 text-base font-medium">
                          {amountPaid.toLocaleString("en-US")}
                        </label>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <label className="text-gray-500 text-sm">Total Cost</label>
                      <div className="flex items-center justify-center">
                        <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
                        <label className="text-gray-700 text-base font-medium">
                          {totalCost.toLocaleString("en-US")}
                        </label>
                      </div>
                    </div>
                    <hr className="border-t border-gray-200 border-dotted w-full my-1" />
                    <div className="flex w-full items-center justify-between mt-2">
                      <label className="text-gray-700 text-base font-medium">Remaining Balance</label>
                      <div className="flex items-center justify-center">
                        <PhilippinePesoIcon className="stroke-2 stroke-gray-700 w-5 h-5" />
                        <label className="text-gray-700 text-base font-medium">
                          {Math.max(0, remainingBalance).toLocaleString("en-US")}
                        </label>
                      </div>
                    </div>
                  </div>
                  {notes && (
                    <div className="px-4 py-2 flex rounded-md items-center gap-1">
                      <NoteIcon className="w-4 h-4 stroke-2 stroke-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-500">{notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
};

export default PaymentHistorySheet;
