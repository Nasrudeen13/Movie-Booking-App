import React from 'react'
import './Profile.css'
import { useEffect, useState } from 'react'

const Profile = () => {
    const [bookings, setBookings] =useState(null)
    const [user, setUser] = useState(null)

    const getBookings = async () => {
        fetch(`http://localhost:8000/movie/getuserbookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setBookings(data.data)
                }
                else {
                    console.log(data)
                }
            }
            )
    }

    const getUserData = async () => {

        fetch(`http://localhost:8000/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setUser(data.data)
                }

                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

        useEffect(() => {
        getBookings()
        getUserData()
    }, [])

    return (
        <div className='profile'>
            <h1 className='head'>Profile</h1>
            <div className='user'>
                <h2>User Details</h2>
                <div className='details'>
                    <div className='detail'>
                        <h3>Name</h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className='detail'>
                        <h3>Email</h3>
                        <p>{user?.email}</p>
                    </div>

                    <div className='detail'>
                        <h3>City</h3>
                        <p>{user?.city}</p>
                    </div>
                </div>


            </div>
            <div className='bookings'>
                <h2>Bookings</h2>
                <div className='details'>
                    {
                        bookings?.map((booking) => {
                            return (
                                <div className='booking' key={booking._id}>
                                    <div className='detail'>
                                        <h3>Movie</h3>
                                        <p>{booking.movieId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Screen</h3>
                                        <p>{booking.screenId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Seats</h3>
                                        <p>{booking.seats.map((seat, index) => {
                                            return (
                                                <span 
                                                key={index}
                                                >{seat.row}{seat.col}{seat.seat_id}, </span>
                                            )
                                        }
                                        )}</p>
                                    </div>

                                    <div className='detail'>

                                        <h3>Price</h3>
                                        <p>{booking.totalPrice}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Type</h3>
                                        <p>{booking.paymentType}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Id</h3>
                                        <p>{booking.paymentId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Date</h3>
                                        <p>{booking.showDate}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Time</h3>
                                        <p>{booking.showTime}</p>
                                    </div>



                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}


export default Profile