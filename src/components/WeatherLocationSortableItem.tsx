import { useSortable } from '@dnd-kit/sortable';
import { Tooltip } from './UI/Tooltip';
import { ArrowsUpDownIcon, XMarkIcon } from '@heroicons/react/16/solid';

type PropsType = {
  id: string;
  city: string;
  country: string;
  tooltipLabel: string;
  setLocations: React.Dispatch<
    React.SetStateAction<
      {
        lat: number;
        lon: number;
        country: string;
        city: string;
        id: string;
      }[]
    >
  >;
};

export const SortableItem = ({ id, city, country, tooltipLabel, setLocations }: PropsType) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const onDeleteLocation = () => {
    setLocations((prevLocations) => prevLocations.filter((item) => item.id !== id));
  };

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition,
      }}
      {...attributes}
      {...listeners}
      key={id}
      className="p-2 border-2 border-b-0 last:border-b-2 border-slate-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <ArrowsUpDownIcon className="w-6 text-slate-600" />
          <span className="text-slate-600 text-lg">
            {city}, {country}
          </span>
        </div>

        <Tooltip content={tooltipLabel}>
          <button
            onClick={onDeleteLocation}
            className="text-red-600 enabled:hover:bg-amber-300 transition-all"
          >
            <XMarkIcon className="w-7 text-red-600" />
          </button>
        </Tooltip>
      </div>
    </li>
  );
};
