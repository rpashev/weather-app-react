import { TrackedLocationsType } from '../schemas/TrackedLocationsSchema';
import { Backdrop } from './UI/Backdrop';
import { DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import { useReplaceTrackedLocationsMutate } from '../hooks/tanstack-query/useReplaceTrackedLocationsMutate.';
import { SortableItem } from './WeatherLocationSortableItem';

type PropsType = {
  setLocationsEditDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trackedLocationList: TrackedLocationsType;
};

export const WeatherLocationsEditDialog = ({
  trackedLocationList,
  setLocationsEditDialogIsOpen,
}: PropsType) => {
  const { mutate, isError } = useReplaceTrackedLocationsMutate();

  const [locations, setLocations] = useState(trackedLocationList.locations);
  const closeDialog = () => setLocationsEditDialogIsOpen(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor)
  );

  const handleDragEnd = useCallback(
    ({ active, over }: { active: any; over: any }) => {
      if (active.id !== over.id) {
        const newLocations = [...locations];
        const activeIndex = newLocations.findIndex((item) => item.id === active.id);
        const overIndex = newLocations.findIndex((item) => item.id === over.id);
        const [removed] = newLocations.splice(activeIndex, 1);
        newLocations.splice(overIndex, 0, removed);
        setLocations(newLocations);
      }
    },
    [locations]
  );

  const onSubmit = () => {
    let payload = { locations: locations.map((item) => item.id) };
    mutate(payload);
    if (!isError) {
      closeDialog();
    }
  };

  return (
    <>
      <Backdrop onClickBackdrop={closeDialog} />
      <dialog
        open
        className="flex flex-col tw-fixed-center bg-red w-[900px] max-w-[95%] h-[500px] mx-auto "
        style={{ zIndex: 2000 }}
      >
        <header className="relative flex justify-between items-center tw-gradient-main py-3 px-4 text-xl font-bold">
          <h2>Your tracked locations</h2>
          <button
            className="px-1 py-0 font-extrabold text-2xl text-grey-600 enabled:hover:bg-amber-300 transition-all"
            onClick={closeDialog}
          >
            &#10005;
          </button>
        </header>
        <section className="p-4">
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext
              items={locations.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col">
                {locations.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    city={item.city}
                    country={item.country}
                    setLocations={setLocations}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </section>
        <div className="flex justify-end items-center gap-2 mt-auto px-4 py-3">
          <button
            className="bg-slate-200 hover:bg-slate-300  transition-all tracking-wider text-slate-600 px-4 py-2 rounded"
            onClick={closeDialog}
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="rounded bg-amber-400 px-4 py-2 tracking-wider text-slate-800
             transition-all enabled:hover:bg-amber-300
             disabled:cursor-not-allowed disabled:opacity-70"
          >
            Submit
          </button>
        </div>
      </dialog>
    </>
  );
};
