export default function Tabs (props) {
  const { tabs, activeTab, onChange } = props

  if (!tabs || tabs.length < 1) return null

  return (
    <ul className='list-reset flex border-b my-5 table w-full sticky top-14 bg-white'>
      {tabs.map(tab => {
        const isActive = activeTab == tab.route
        return (
          <li key={tab.route} className={`table-cell hover:bg-teal-100 ${isActive ? 'bg-teal-300 hover:bg-teal-300 rounded-t' : ''}`}>
            <div onClick={() => onChange(tab)} className={`cursor-pointer py-2 font-semibold text-center w-full`}>{tab.title}</div>
          </li>
        )
      })}
    </ul>
  )

}