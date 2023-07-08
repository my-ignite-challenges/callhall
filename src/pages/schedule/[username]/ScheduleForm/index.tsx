import { useState } from "react";

import { CalendarStep } from "./CalendarStep";
import { ConfirmationStep } from "./ConfirmationStep";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  function handleSelectedDateTimeDismissal() {
    setSelectedDateTime(null);
  }

  if (selectedDateTime) {
    return (
      <ConfirmationStep
        scheduleDate={selectedDateTime}
        dismissOrGoBack={handleSelectedDateTimeDismissal}
      />
    );
  }

  return <CalendarStep onDateTimeSelection={setSelectedDateTime} />;
}
