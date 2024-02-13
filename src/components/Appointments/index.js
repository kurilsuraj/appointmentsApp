// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    appointmentTitle: '',
    appointmentDate: '',
    starredStatus: false,
  }

  onclickAdd = () => {
    const {appointmentTitle, appointmentDate} = this.state
    const listItem = {
      id: uuidv4(),
      title: appointmentTitle,
      date: appointmentDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, listItem],
      appointmentTitle: '',
      appointmentDate: '',
    }))
  }

  onchangeInputTitle = event => {
    const inputValue = event.target.value
    this.setState({appointmentTitle: inputValue})
  }

  onchangeInputDate = event => {
    const inputValue = event.target.value
    this.setState({appointmentDate: inputValue})
  }

  onclickStar = id2 => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id2 === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({starredStatus: !prevState.starredStatus}))
  }

  render() {
    const {
      appointmentList,
      appointmentTitle,
      appointmentDate,
      starredStatus,
    } = this.state
    const listLen = appointmentList.length

    const filterClassName = starredStatus ? 'filter-filled' : 'filter-empty'

    let appointmentList2 = null

    if (starredStatus) {
      appointmentList2 = appointmentList.filter(
        each => each.isFavorite === true,
      )
    } else {
      appointmentList2 = appointmentList
    }

    const list =
      listLen > 0 ? (
        <ul className="appointments-list">
          {appointmentList2.map(each => (
            <AppointmentItem
              key={each.id}
              title={each.title}
              date={each.date}
              id2={each.id}
              isFavorite={each.isFavorite}
              onClickStar={this.onclickStar}
            />
          ))}
        </ul>
      ) : (
        ''
      )
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="two">
            <div className="left-side">
              <h1>Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                onChange={this.onchangeInputTitle}
                id="title"
                type="text"
                placeholder="Title"
                value={appointmentTitle}
              />

              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="input"
                onChange={this.onchangeInputDate}
                id="date"
                placeholder="dd/mm/yyyy"
                type="date"
                value={appointmentDate}
              />

              <button
                className="button"
                onClick={this.onclickAdd}
                type="button"
              >
                Add
              </button>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div>
            <div className="header-with-filter-container">
              <h1>Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickStarred}
                type="button"
              >
                Starred
              </button>
            </div>
            {list}
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
