import { TableData, TableRow } from '@components/ui/DataTable';
import { ActivityType } from '../../types/activity.types';
import Avatar from '@components/ui/Avatar';
import { isNew } from '@utils/date.utils';
import ClockIcon from '@icons/linear/ClockIcon';
import { formatTime, getActionClasses } from '../../utils/activity.utils';
import { formatISODateWithStringWithSuffix } from '@features/shared/calendar/utils/calendar.utils';

interface IActivityRow{
  activity: ActivityType;
  index: number;
  gridTemplate: string;
}

const ActivityRow = ({
  activity,
  index,
  gridTemplate,
}: IActivityRow ) => {
   
  
  const assistant = activity.activityAssistantId
  const actionClass = getActionClasses(activity.activityAction)

  return (
    <TableRow 
      index={index}
      key={index}
      gridTemplateColumns={gridTemplate}   
    >
      <TableData
        className="flex items-start gap-4 "
      >
        <Avatar 
          name={assistant.assistantFullName}
          src={assistant.assistantAvatar}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-700">
              {assistant.assistantFullName}
            </label>
            {isNew(activity.createdAt) && 
              <span className="flex shrink-0 uppercase text-xs px-2 py-1 rounded-full bg-red-50 text-red-500">NEW</span>
            }
          </div>
          <label className="text-sm text-gray-500 ">
            {assistant.assistantRole}
          </label>
        </div>
      </TableData>
      <TableData className="w-full items-center flex justify-start">
        <p className="text-gray-500">
          {activity.activityDescription}
        </p>
      </TableData>
      <TableData className="w-full items-center flex justify-start">
        <span className={`${actionClass} text-xs uppercase rounded-full px-2 py-1 `}>
          {activity.activityAction}
        </span>
      </TableData>
      <TableData
        className="w-full items-center flex justify-start gap-2"
      > 
        <ClockIcon className="w-4 h-4  stroke-2 stroke-gray-500" />
        <p className="text-gray-500">
          {formatTime(activity.createdAt)}
        </p>
      </TableData>
      <TableData className="w-full items-center flex justify-start">
        <p className="text-gray-500">
          {formatISODateWithStringWithSuffix(activity.updatedAt)}
        </p>
      </TableData>
    </TableRow>
  )
}

export default ActivityRow
