import React, { useEffect, useState } from 'react';
import DashboardActions from './DashboardActions';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { getWorkouts } from '../../actions/workout';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';

const Activity = ({ workout: { workouts } }) => {
  // Map through the data
  console.log(workouts);

  const [data, setData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);

  // Weekly Frequency Data
  useEffect(() => {
    const frequencyObject = workouts
      .map((workout) => {
        return DateTime.fromISO(workout.date).weekNumber;
      })
      .reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
    const weekFrequencyData = Object.keys(frequencyObject).map((item) => ({
      Week: item,
      Frequency: frequencyObject[item],
    }));
    setData(weekFrequencyData);
  }, [workouts]);

  // Daily Calendar Data
  useEffect(() => {
    const frequencyObject = workouts
      .map((workout) => {
        return DateTime.fromISO(workout.date).toISODate();
      })
      .reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
    const dailyFrequencyData = Object.keys(frequencyObject).map((item) => ({
      day: item,
      value: frequencyObject[item],
    }));
    setCalendarData(dailyFrequencyData);
  }, [workouts]);

  // needs to be

  useEffect(() => {
    console.log(calendarData);
  }, [calendarData]);

  const weekToday = DateTime.now().weekNumber; // Date now -- count the workouts that fall to this week

  const parseDateWeek = DateTime.fromISO(
    '2021-07-28T10:42:49.370+00:00'
  ).weekNumber; // count the

  const parseDate = DateTime.fromISO(
    '2021-07-28T10:42:49.370+00:00'
  ).toISODate();

  return (
    // <div className='h-screen flex mt-8'>
    //   <DashboardActions />
    <div className='w-full  flex max-h-96 space-x-5 py-0 px-2'>
      <div class='flex flex-col items-center h-96 w-2/5  space-x-10 justify-around p-6 bg-white rounded-xl space-x-2 mt-0 shadow-lg'>
        <h2>Your Workout Frequency per Week</h2>
        <h2>parsedate is {parseDate}</h2>
        <ResponsiveBar
          data={data}
          keys={['Frequency']}
          indexBy='Week'
          margin={{ top: 16, right: 16, bottom: 32, left: -16 }}
          padding={0.4}
          colors='#6366F1'
          theme={{
            background: '#ffffff',
            textColor: '#000000',
            axis: {
              textColor: '#000000',
              fontSize: '14px',
              tickColor: '#eee',
            },
          }}
          valueScale={{ type: 'linear' }}
          axisLeft={false}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            textColor: '#000000',
          }}
          enableGridX={false}
          enableGridY={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          isInteractive={false}
          motionStiffness={140}
        />
      </div>
      <div class='flex flex-col items-center h-96 w-5/6 justify-around p-3 bg-white rounded-xl mt-0 shadow-lg'>
        {/* Start of component  */}
        <h2>Your Daily Progress</h2>
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
    // </div>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps)(Activity);

{
  /* <div class='flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg'>
            <div>
              <span class='text-sm font-semibold text-gray-400'>
                Spent this month
              </span>
              <h1 class='text-2xl font-bold'>$682.5</h1>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-8 w-8 text-indigo-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 11l7-7 7 7M5 19l7-7 7 7'
                />
              </svg>
            </div>
          </div>
          <div class='flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg'>
            <div>
              <span class='text-sm font-semibold text-gray-400'>
                Spent this month
              </span>
              <h1 class='text-2xl font-bold'>$682.5</h1>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-8 w-8 text-indigo-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
              </svg>
            </div>
          </div> */
}
