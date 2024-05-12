import { useSortable } from '@dnd-kit/sortable';
import { Tooltip } from './UI/Tooltip';

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
      <div className="flex justify-between items-center">
        <span>
          {city}, {country}
        </span>
        <Tooltip content={tooltipLabel}>
          <button
            onClick={onDeleteLocation}
            className="px-1 py-0 font-extrabold text-md text-red-600 enabled:hover:bg-amber-300 transition-all"
          >
            &#10005;
          </button>
        </Tooltip>
      </div>
    </li>
  );
};
