import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { DateTime } from 'luxon';

const Activity = ({ workouts }) => {
  // Local State
  const [data, setData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);

  // Date constants
  const today = DateTime.now().toLocaleString(DateTime.DATETIME_MED); // Date and time now
  const twoWeeksBefore = DateTime.now().weekNumber - 2;
  const lastWeek = DateTime.now().weekNumber - 1;
  const weekToday = DateTime.now().weekNumber;

  // Weekly Frequency Data
  useEffect(() => {
    const filteredWorkouts = workouts
      .map((workout) => {
        return DateTime.fromISO(workout.date).weekNumber;
      })
      .filter(
        (item) =>
          item == twoWeeksBefore || item == lastWeek || item == weekToday
      );

    const frequencyObject = filteredWorkouts
      .map((workout) => {
        if (workout == twoWeeksBefore) {
          return 'Weeks Before';
        } else if (workout == lastWeek) {
          return 'Last Week';
        } else if (workout == weekToday) {
          return 'This Week';
        }
      })
      .reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
    setData(
      Object.keys(frequencyObject).map((item) => ({
        Week: item,
        Frequency: frequencyObject[item],
      }))
    );
  }, [workouts]);

  // Daily Calendar Data
  useEffect(() => {
    const frequencyObject = workouts
      .map((workout) => {
        return DateTime.fromISO(workout.date).toISODate();
      })
      .reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
    setCalendarData(
      Object.keys(frequencyObject).map((item) => ({
        day: item,
        value: frequencyObject[item],
      }))
    );
  }, [workouts]);

  // const parseDateWeek = DateTime.fromISO(
  //   '2021-07-28T10:42:49.370+00:00'
  // ).weekNumber; // count the

  // const parseDate = DateTime.fromISO(
  //   '2021-01-04T10:42:49.370+00:00'
  // ).weekNumber;
  // // .toLocaleString({ month: 'long', day: 'numeric' });

  // console.log(parseDate);

  return (
    <div className='w-full flex flex-col md:flex-row h-auto md:max-h-96 space-y-5 md:space-y-0 md:space-x-4 py-0 px-0'>
      <div className='flex w-full flex-col space-y-5'>
        <div class='flex justify-between w-full h-auto p-1 bg-white rounded-xl mt-0 shadow-lg'>
          <div>
            <h2 className='text-xl md:text-2xl text-indigo-700 font-bold text-left mb-2'>
              Today is {today}
            </h2>
            <h2 className='text-md md:text-lg mb-2 text-gray-600 font-semibold'>
              {' '}
              What workout are you doing today?
            </h2>
            <p className='text-sm md:text-md text-gray-500'>
              {' '}
              Let's get started by clicking on the "New Workout" button.
            </p>
          </div>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-24 w-24 text-indigo-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        </div>
        <div class='flex flex-col items-center h-40 md:h-56 w-full justify-around p-1 bg-white rounded-xl mt-0 shadow-lg'>
          {/* Start of component  */}
          <h2 className='text-md text-indigo-600 font-bold text-center'>
            Your Workout Heatmap Calendar
          </h2>
          <ResponsiveCalendar
            data={calendarData}
            from='2021-07-01'
            to='2021-08-13'
            emptyColor='#eeeeee'
            // colors={['#f47560', '#e8c1a0', '#97e3d5', '#61cdbb']}
            colors={['#6366F1']}
            minValue={0}
            maxValue={1}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            yearSpacing={60}
            monthBorderColor='#ffffff'
            dayBorderWidth={2}
            dayBorderColor='#ffffff'
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
              },
            ]}
          />
        </div>
      </div>
      <div class='flex flex-col items-center h-96 w-full md:w-2/5 justify-around p-6 bg-white rounded-xl mt-0 shadow-lg'>
        <h2 className='text-md text-indigo-600 font-bold text-center'>
          Weekly Workout Frequency
        </h2>
        <ResponsiveBar
          data={data}
          keys={['Frequency']}
          indexBy='Week'
          margin={{ top: 16, right: 0, bottom: 20, left: 0 }}
          padding={0.2}
          colors='#6366F1'
          theme={{
            background: '#ffffff',
            textColor: '#000',
          }}
          valueScale={{ type: 'linear' }}
          axisLeft={false}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            textColor: '#000',
          }}
          enableGridX={false}
          enableGridY={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          isInteractive={false}
          motionStiffness={140}
        />
      </div>
    </div>
  );
};

export default Activity;
