// REACT
import { useCallback, useState } from 'react';
// COMPONENTS
import { Backdrop } from './UI/Backdrop';
import { SortableItem } from './WeatherLocationSortableItem';
import { XMarkIcon } from '@heroicons/react/16/solid';

// HOOKS
import { useReplaceTrackedLocationsMutate } from '../hooks/tanstack-query/useReplaceTrackedLocationsMutate.';
// DND-KIT
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// TYPES
import { type TrackedLocationsType } from '../schemas/TrackedLocationsSchema';
import { useSettingsContext } from '../context/settings-context';

type PropsType = {
  setLocationsEditDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trackedLocationList: TrackedLocationsType;
};

export const WeatherLocationsEditDialog = ({
  trackedLocationList,
  setLocationsEditDialogIsOpen,
}: PropsType) => {
  const { mutate, isError } = useReplaceTrackedLocationsMutate();

  const { translations } = useSettingsContext();

  const [locations, setLocations] = useState(trackedLocationList.locations);
  const closeDialog = () => setLocationsEditDialogIsOpen(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
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
        className="flex flex-col sm:tw-fixed-center fixed top-0 bg-red w-[900px] overflow-y-auto max-w-[100%] md:h-[500px] h-screen no-doc-scroll"
        style={{ zIndex: 3000 }}
      >
        <header className="relative flex justify-between items-center tw-gradient-main py-3 px-4 pr-2 text-xl font-bold">
          <h2>{translations?.weatherLocEditDialog.title}</h2>
          <button
            className="text-grey-600 enabled:hover:bg-amber-300 transition-all"
            onClick={closeDialog}
          >
            <XMarkIcon className="w-8 text-slate-800" />
          </button>
        </header>
        <section className="p-4">
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext
              items={locations.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col touch-none">
                {locations.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    city={item.city}
                    country={item.country}
                    setLocations={setLocations}
                    tooltipLabel={translations?.weatherLocEditDialog.removeTooltip!}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </section>
        <p className="text-xs px-4">{translations?.weatherLocEditDialog.hint}</p>
        <div className="flex justify-end items-center gap-2 mt-auto px-4 py-3">
          <button
            className="bg-slate-200 hover:bg-slate-300  transition-all tracking-wider text-slate-600 px-4 py-2 rounded"
            onClick={closeDialog}
          >
            {translations?.weatherLocEditDialog.close}
          </button>
          <button
            onClick={onSubmit}
            className="rounded bg-amber-400 px-4 py-2 tracking-wider text-slate-800
             transition-all enabled:hover:bg-amber-300
             disabled:cursor-not-allowed disabled:opacity-70"
          >
            {translations?.weatherLocEditDialog.submitBtn}
          </button>
        </div>
      </dialog>
    </>
  );
};
