// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {title, date, id2, isFavorite, onClickStar} = props
  console.log(date)
  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const newDate2 = `Date: ${newDate}`

  const imgLink = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onclickstar = () => {
    onClickStar(id2)
  }
  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="para">{title}</p>
        <button
          className="button2"
          onClick={onclickstar}
          type="button"
          data-testid="star"
        >
          <img src={imgLink} alt="star" />
        </button>
      </div>
      <p>{newDate2}</p>
    </li>
  )
}

export default AppointmentItem
