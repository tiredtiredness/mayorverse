import { Programming } from '@solar-icons/react/ssr';

export default function ActivityPage() {
  return (
    <div className='space-y-4'>
      <div className='text-center py-12'>
        <Programming />
        <h3 className='text-xl font-medium mb-2'>This page is developing</h3>
      </div>
      {/* {recentActivity.length > 0 ? (
        recentActivity.map((activity, i) => (
          <div
            key={i}
            className='bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700 flex items-start gap-3'
          >
            <div className='bg-teal-900/30 p-2 rounded-lg'>
              {activity.type === 'poll' && (
                <AddSquare className='w-5 h-5 text-teal-400' />
              )}
              {activity.type === 'vote' && (
                <Heart className='w-5 h-5 text-pink-400' />
              )}
              {activity.type === 'comment' && (
                <CupStar className='w-5 h-5 text-amber-400' />
              )}
            </div>
            <div>
              <p className='font-medium'>
                {activity.type === 'poll' && 'Created a new poll'}
                {activity.type === 'vote' && 'Voted in a poll'}
                {activity.type === 'comment' && 'Posted a comment'}
              </p>
              <p className='text-sm text-gray-400'>
                in <span className='text-teal-400'>{activity.city}</span> •{' '}
                {activity.date}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-12'>
          <div className='mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4'>
            <AddSquare className='w-10 h-10 text-gray-600' />
          </div>
          <h3 className='text-xl font-medium mb-2'>No recent activity</h3>
          <p className='text-gray-400 max-w-md mx-auto'>
            Your interactions with cities will appear here. Get involved in city
            discussions!
          </p>
        </div>
      )} */}
    </div>
  );
}
