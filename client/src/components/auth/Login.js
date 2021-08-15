import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// inspiration: https://aspire.app/

const Login = ({ login, isAuthenticated }) => {
  // Component State Hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // The ...formData is a spreader and copies the formData
  // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
  // e.target.value -- is the change in value in the fields

  //Subit function form
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password); // action to reducer
  };

  //Redirect to dashboard if logged in
  if (isAuthenticated) {
    return <Redirect to='dashboard' />;
  }

  return (
    <div
      className=' bg-gray-200 text-gray-900 rounded-3xl shadow-xl w-full overflow-hidden'
      // style='max-width:1000px'
    >
      <div className='md:flex w-full'>
        <div className='hidden md:block w-1/2 bg-indigo-500'>
          <img
            className='h-auto w-auto'
            src='https://images.unsplash.com/photo-1576678927484-cc907957088c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
          />
          {/* Put svg here */}
          {/* <svg
            id='f6ab8ba1-7e68-4bec-bb42-3789208a6270'
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='auto'
            viewBox='0 0 1080 589.33892'
          >
            <title>working_out</title>
            <path
              d='M1140,707.81053c0-32.1668-16.3221-58.24316-36.45652-58.24316-12.655,0-23.8005,10.30531-30.33731,25.94558a18.28713,18.28713,0,0,0-6.967-1.398c-6.09437,0-11.72912,3.12278-16.32427,8.40786-5.89246-19.501-18.38734-32.95544-32.84964-32.95544-13.52217,0-25.316,11.77071-31.60967,29.23968a19.91524,19.91524,0,0,0-12.47729-4.6921C957.52634,674.115,945,694.127,945,718.81316a65.14473,65.14473,0,0,0,4.40793,24.06827h183.23972C1137.261,733.12519,1140,720.98025,1140,707.81053Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M1009.299,371.48173c-28.71033-62.10748-84.89587-115.09021-152.77118-123.72558-17.94635-2.28321-36.68378-1.3675-53.33478,5.70556-21.857,9.28455-37.96508,28.02509-54.24615,45.31275A654.10822,654.10822,0,0,1,633.987,395.62193c-20.687,13.696-42.876,26.47455-67.43726,29.97882-49.2453,7.02606-97.95556-26.55633-120.41418-70.94189-14.02936-27.7265-20.51245-60.27961-31.85358-89.119-13.0614-.025-28.62286-.0202-45.36487.05694-46.27673.21332-83.94415.897-83.94415.897s44.77362-59.30725,83.77625-37.33435c12.46411,7.02191,25.51886,13.28808,37.51635,18.56665-6.81579-13.11078-15.41308-24.90729-27.24035-34.39191-23.32129-18.7019-54.90741-23.94775-84.7688-22.555-31.35675,1.46252-63.00171,9.8576-88.48157,28.19232-45.39062,32.662-64.135,90.15283-80.17773,143.72284l38.77752,19.43982c16.63312-14.38,40.95581-28.6048,63.37458-15.97473,39.00256,21.973,83.80658,36.562,83.80658,36.562s-37.36194-.33789-83.63868-.12464c-7.77227.03583-15.29242.08515-22.44134.142L636,618.56737c142,2,249.06818-5.67914,384,0,7.03717.29614,22.86554-36.592,22.91827-46.29987C1043.29016,503.84611,1038.00934,433.58922,1009.299,371.48173Zm-137.88184,18.615c-46.27673.21332-83.94415.897-83.94415.897s44.77362-59.30725,83.77625-37.33435,83.80658,36.562,83.80658,36.562S917.69385,389.88353,871.41711,390.09678Z'
              transform='translate(-60 -155.33054)'
              fill='#f2f2f2'
            />
            <path
              d='M992,593.06737c0-23.38843-14.48063-42.34852-32.34348-42.34852-11.22724,0-21.11532,7.493-26.91464,18.865a19.36184,19.36184,0,0,0-6.181-1.01647,21.05874,21.05874,0,0,0-14.48256,6.11334c-5.22767-14.17914-16.31287-23.96186-29.14353-23.96186-11.99658,0-22.45981,8.55848-28.04345,21.26014a20.10673,20.10673,0,0,0-11.06959-3.41162c-13.70863,0-24.82174,14.55072-24.82174,32.5a39.92792,39.92792,0,0,0,3.91062,17.5H985.47715A51.20123,51.20123,0,0,0,992,593.06737Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
              opacity='0.3'
            />
            <polygon
              points='1080 589.237 82 589.237 82 587.237 1079 587.237 1080 589.237'
              fill='#2f2e41'
            />
            <polygon
              points='998 465.237 0 465.237 0 463.237 997 463.237 998 465.237'
              fill='#2f2e41'
            />
            <path
              d='M483.62962,436.46721s6.28547-46.09349,16.76127-33.52254,0,31.42738,0,31.42738l-8.38064,10.4758-8.38063-6.28548Z'
              transform='translate(-60 -155.33054)'
              fill='#ffb8b8'
            />
            <path
              d='M458.48771,451.13332s20.95159-23.04674,25.14191-18.85643,16.76127,6.28548,14.66611,14.66611-46.0935,35.6177-46.0935,35.6177Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M458.48771,451.13332s20.95159-23.04674,25.14191-18.85643,16.76127,6.28548,14.66611,14.66611-46.0935,35.6177-46.0935,35.6177Z'
              transform='translate(-60 -155.33054)'
              opacity='0.1'
            />
            <path
              d='M339.06366,449.03816v16.76127s-2.09516,37.71286,10.47579,35.6177,6.28548-33.52254,6.28548-33.52254l-2.09516-18.85643Z'
              transform='translate(-60 -155.33054)'
              fill='#ffb8b8'
            />
            <path
              d='M345.34914,570.55737s-18.85643,29.33223-25.14191,31.42739-39.808,20.95158-43.99833,39.808l-29.33223,37.71286,14.66611,18.85643s67.04509-71.2354,85.90151-77.52088,37.71286-37.71285,37.71286-37.71285Z'
              transform='translate(-60 -155.33054)'
              fill='#ffb8b8'
            />
            <path
              d='M494.10541,522.36872s39.808,6.28548,33.52254,31.42738S460.58287,631.317,460.58287,631.317l-2.09516,12.571L435.441,648.07825l-10.47579-10.47579,2.09516-6.28548s25.1419-23.04675,27.23706-31.42738,25.14191-41.90318,35.6177-43.99834L475.249,547.51063Z'
              transform='translate(-60 -155.33054)'
              fill='#ffb8b8'
            />
            <path
              d='M253.16215,679.50563s8.38063-12.571-4.19032-10.47579-20.95159,4.19031-20.95159,12.57095,10.4758,67.04508,23.04675,62.85476,2.09516-23.04674,2.09516-23.04674,6.28547-16.76127,10.47579-18.85643,4.19032-12.57095,0-12.57095S251.067,683.696,253.16215,679.50563Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M431.25065,633.41214s0-10.4758-8.38064,0-12.57095,18.85643-4.19032,25.1419,37.71286,20.95159,37.71286,20.95159,31.42738,6.28548,27.23707-8.38063c0,0-20.95159-10.4758-20.95159-18.85643s0-23.04675-6.28548-18.85643S431.25065,639.69761,431.25065,633.41214Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M391.44263,476.27523s-29.33222,4.19032-27.23707,46.09349c0,0-37.71285,37.71286-27.23706,50.28381s33.52254,35.6177,41.90318,29.33223,33.52254-54.47413,33.52254-54.47413,58.66444,20.95158,69.14024,10.47579,20.95159-35.6177,20.95159-35.6177l-52.379-27.23706Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <circle cx='413.15382' cy='176.37873' r='25.14191' fill='#ffb8b8' />
            <path
              d='M454.29739,333.80443s-14.66611,23.04675-18.85643,25.14191,29.33223,23.04674,29.33223,23.04674,0-27.23706,10.47579-33.52254Z'
              transform='translate(-60 -155.33054)'
              fill='#ffb8b8'
            />
            <path
              d='M452.20223,356.85118s-33.52254-10.4758-39.808,6.28547-20.95159,48.18866-18.85643,69.14024,6.28547,16.76127,0,23.04675-10.4758,2.09516-8.38064,10.47579,4.19032,8.38064,2.09516,12.571S412.39422,497.22682,435.441,499.322l23.04675,2.09516s0-37.71285,4.19032-46.09349,12.571-25.14191,12.571-31.42738V407.26541a63.60673,63.60673,0,0,0-8.38063-31.55779h0S454.29739,356.85118,452.20223,356.85118Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M427.06033,365.23181s-77.52088,6.28548-85.90151,27.23707-12.57095,62.85476-4.19032,62.85476,18.85643,4.19032,20.95159,0,10.47579-46.09349,12.57095-46.09349,64.94992-6.28548,64.94992-6.28548S462.678,369.42213,427.06033,365.23181Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M474.164,325.47626s6.67194-11.59461,15.01174-1.52364S511.08269,315.51641,509,311.56737s-9.4377.17756-22.04212-3.94283-36.88462-12.51447-40.951,14.86727,5.61827,24.51117,5.61827,24.51117,4.43914-24.26318,8.45125-17.29375l4.01211,6.96944,3.4802.85654Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <circle cx='651.30874' cy='75.31366' r='30.67436' fill='#2f2e41' />
            <path
              d='M701.50364,253.34864s1.58734,28.57208-1.58733,28.57208S719.758,295.41309,719.758,295.41309l14.286-7.93668v-9.524s-19.04806-2.381-11.11137-23.0164S701.50364,253.34864,701.50364,253.34864Z'
              transform='translate(-60 -155.33054)'
              fill='#9f616a'
            />
            <polygon
              points='574.835 411.517 572.454 435.327 580.391 437.708 586.74 431.359 589.121 411.517 574.835 411.517'
              fill='#9f616a'
            />
            <polygon
              points='689.124 425.01 693.092 440.089 704.203 447.232 716.109 440.883 702.616 418.66 689.124 425.01'
              fill='#9f616a'
            />
            <circle cx='649.0435' cy='87.30358' r='23.0164' fill='#9f616a' />
            <path
              d='M695.15429,328.74719l-5.55568-2.381s-9.524-5.55568-10.31769-16.667,7.93668-25.3974,7.93668-25.3974l12.69871-3.96834,14.92,12.14338.15973,19.60337Z'
              transform='translate(-60 -155.33054)'
              fill='#9f616a'
            />
            <path
              d='M689.59861,285.88907l-3.17467-1.58734s-15.87338-.79367-17.46072,18.25438-7.143,50.79481-7.143,50.79481-12.6987,22.22273-11.905,46.0328l-6.34935,20.63539s-8.73036,30.15941,1.58733,30.15941,9.524-32.54042,9.524-32.54042,19.048-46.03279,20.63539-53.96948,15.07971-45.23913,11.11137-55.55682S689.59861,285.88907,689.59861,285.88907Z'
              transform='translate(-60 -155.33054)'
              fill='#9f616a'
            />
            <path
              d='M701.50364,335.89021v8.73035s5.55569,6.34936,3.17468,10.3177-4.762,11.905-4.762,11.905L711.02767,384.304l37.30244,3.17467,7.418-49.69947Z'
              transform='translate(-60 -155.33054)'
              fill='#9f616a'
            />
            <path
              d='M736.42507,280.33339l6.34935-3.17468s13.49238-9.524,24.60374-11.11136l34.12776-23.0164,22.22273-53.17582s-.79367-28.57207,5.55568-25.3974S834.84,192.23614,834.84,192.23614s-11.905,49.20747-22.22272,62.69984-47.62014,35.7151-47.62014,35.7151-10.31769,11.905-9.524,17.46072S736.42507,280.33339,736.42507,280.33339Z'
              transform='translate(-60 -155.33054)'
              fill='#9f616a'
            />
            <path
              d='M707.05933,366.84329s-8.73036-5.55568-14.286,3.96835-15.87338,11.905-22.22273,40.47711S649.1215,485.1,645.15315,488.27463s-20.63539,36.50877-11.11136,83.33523h15.87338L663.40754,504.148s43.65179-53.96949,46.82646-76.19221L724.52,511.291s.79367,31.74675,12.6987,46.82646l12.6987,30.15942,16.667-7.93669-19.048-76.19221s9.524-76.98588,3.17467-98.41494l-.91239-28.09391S723.72637,378.74833,707.05933,366.84329Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M640.39114,586.68957h-9.524c-1.58733,0-14.286,10.31769-8.73035,15.87338s14.286,15.87337,14.286,15.87337,30.95308,3.93669,31.74675-1.619-13.49237-17.42906-13.49237-17.42906l-3.96834-12.6987S642.77215,577.95921,640.39114,586.68957Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M766.58449,594.62626s-13.49237-.79367-15.87338-1.58734-7.143,20.63539,0,22.22273S787.21988,619.23,787.21988,619.23s23.0164-.79367,21.42906-7.143-32.54042-19.048-32.54042-19.048S772.14017,585.10223,766.58449,594.62626Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M703.88465,279.53972l-3.96834-2.381-4.762,3.96834s14.286,9.524,11.11137,18.25439-16.66705,26.98474-16.66705,26.98474,11.905,13.49237,11.905,18.25438c0,0,30.95309-11.11136,53.96949,0,0,0,0-15.87337,3.17467-19.048s4.762-14.286-3.17467-23.81006a174.0074,174.0074,0,0,1-15.07971-22.22273l-7.93669-4.762-4.0879,1.29666s8.05624,9.021.11956,9.81471S707.853,284.30173,703.88465,279.53972Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M733.72756,178.34694a16.76744,16.76744,0,0,1-10.4,5.44762c-6.93334.99048-1.48571,11.88573-1.48571,11.88573s-1.981-3.96191,1.981-7.42858S733.72756,182.80408,733.72756,178.34694Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <circle cx='660.36019' cy='42.62787' r='8.54859' fill='#2f2e41' />
            <path
              d='M730.34038,206.376c-6.60419-3.44952-17.9654-6.16264-24.00173-5.9687l1.527-5.83788c5.34392,3.63063,16.6454,6.39441,24.00173,5.9687Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
            />
            <path
              d='M716.69635,206.88982s-10.40688,13.38026-31.22063,16.35366-4.46009,35.68071-4.46009,35.68071-5.94678-11.89357,5.94679-22.30044S716.69635,220.27008,716.69635,206.88982Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <path
              d='M717.49,206.09615s5.94678,20.81375,14.867,23.78714,4.46009,34.194-10.40687,37.16741c0,0,12.63692-17.097,5.20344-30.47727S715.26,212.78628,717.49,206.09615Z'
              transform='translate(-60 -155.33054)'
              fill='#2f2e41'
            />
            <rect
              x='742.69642'
              y='15.87338'
              width='54.76315'
              height='6.34935'
              fill='#2f2e41'
            />
            <ellipse
              cx='797.45958'
              cy='19.04805'
              rx='4.76201'
              ry='19.04805'
              fill='#2f2e41'
            />
            <ellipse
              cx='742.69642'
              cy='19.04805'
              rx='4.76201'
              ry='19.04805'
              fill='#2f2e41'
            />
            <rect
              x='770.47483'
              y='442.88249'
              width='54.76315'
              height='6.34935'
              fill='#2f2e41'
            />
            <ellipse
              cx='825.23799'
              cy='446.05716'
              rx='4.76201'
              ry='19.04805'
              fill='#2f2e41'
            />
            <ellipse
              cx='770.47483'
              cy='446.05716'
              rx='4.76201'
              ry='19.04805'
              fill='#2f2e41'
            />
            <path
              d='M254,593.06737c0-23.38843-14.48063-42.34852-32.34348-42.34852-11.22724,0-21.11532,7.493-26.91464,18.865a19.36184,19.36184,0,0,0-6.181-1.01647,21.05874,21.05874,0,0,0-14.48256,6.11334c-5.22767-14.17914-16.31287-23.96186-29.14353-23.96186-11.99658,0-22.45981,8.55848-28.04345,21.26014a20.10673,20.10673,0,0,0-11.06959-3.41162c-13.70863,0-24.82174,14.55072-24.82174,32.5a39.92792,39.92792,0,0,0,3.91062,17.5H247.47715A51.20123,51.20123,0,0,0,254,593.06737Z'
              transform='translate(-60 -155.33054)'
              fill='#ffffff'
              opacity='0.3'
            />
          </svg> */}
        </div>
        <div className='w-full md:w-1/2 py-10 px-5 md:px-10'>
          <div className='text-center mb-2'>
            <h1 className='font-bold text-3xl text-gray-900 mb-3'>LOG IN</h1>
            <p>Welcome back! Log in to your account here.</p>
          </div>
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-5'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Login Email
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      {/* <i className='mdi mdi-email-outline text-gray-400 text-lg'></i> */}
                    </div>
                    <input
                      type='email'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='yourlogin@email.com'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-8'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Password
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      <i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
                    </div>
                    <input
                      type='password'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='************'
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      minLength='6'
                    />
                  </div>
                </div>
              </div>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-5'>
                  <input
                    type='submit'
                    className='block w-full max-w-xs mx-auto cursor-pointer bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg p-1 font-semibold'
                    value='LOG IN'
                  />
                </div>
              </div>
              {/*  */}
            </form>
            <p className='text-sm text-center flex justify-center gap-x-1'>
              Don't have an account yet?{' '}
              <Link to='/register'>
                {' '}
                <p className='text-indigo-500'>Sign up for free</p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Proptypes are there to tell other developers what kind of props are used in this component
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

{
  /* <Fragment>
<div className='flex justify-center items-center'>
  <div className='shadow-md mt-5 w-5/12 p-3 flex flex-col'>
    <h1 className='large text-primary'>Sign In</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Sign into Your Account
    </p>
    <form className='form' onSubmit={(e) => onSubmit(e)}>
      <div className='form-group'>
        <input
          className='max-w-7xl'
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <input type='submit' className='btn btn-primary' value='Login' />
    </form>
    <p className='my-1'>
      Don't have an account? <Link to='/register'>Sign Up</Link>
    </p>
  </div>
</div>
</Fragment> */
}
