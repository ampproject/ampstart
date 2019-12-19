export default function ActivityButton({name, title, children}) {
  return (
    <a
      href='results?amp=1'
      className={`travel-activities-activity travel-type-${name} mx1`}
      on='
            tap:AMP.setState({
              ui_viewIndex: 1,
              fields_type: [name],
              query_type: [name]
            })
          '
    >
      <div className='travel-shadow circle inline-block'>
        <div className='travel-activities-activity-icon'>{children}</div>
      </div>
      <p className='bold center line-height-4'>{title}</p>
    </a>
  );
}
