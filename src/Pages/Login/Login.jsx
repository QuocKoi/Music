import React from 'react'

export default function Login() {
    return (
        <div className='w-50 mx-auto text-center'>
            <form>
                <img src={require('../../assets/logo/logo.png')} />
                <button type="button" className="btn btn-primary d-block w-100"><i className="fab fa-facebook-square" /> LOGIN WITH FACEBOOK</button>
                <p>OR</p>
                <div className='form-group mb-3'>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='UserName' />
                </div>
                <div className='form-group mb-4'>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Password' />
                </div>
                <button type="button" className="btn btn-success d-block w-100"> LOGIN</button>
            </form>

        </div>
    )
}
