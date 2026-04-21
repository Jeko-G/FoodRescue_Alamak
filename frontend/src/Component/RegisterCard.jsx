import React from "react";

class RegisterCard extends React.Component {
    constructor(props){
        super(props);
    }

    async postUser() {
        const emailInp = document.getElementById("email_input").value
        const usernameInp = document.getElementById("username_input").value
        const passwordInp = document.getElementById("password_input").value
        const confirmPasswordInp = document.getElementById("confirm_password_input").value

        if (passwordInp === confirmPasswordInp) {
            const res = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "NIK": "Placeholder NIK",
                    "full_name": "Placeholder Full Name",
                    "email": emailInp,
                    "username": usernameInp,
                    "password": passwordInp,
                    "address": "Placeholder Address",
                    "birthdate": new Date(),
                    "current_employment": "Unemployed",
                    "salary": 1000000,
                    "marriage_status": "Single",
                    "created_at": new Date(),
                    "updated_at": new Date()
                })    
            })
            const data = await res.json()

            console.log(data)
            if (res.status === 201) {
                alert("Login Berhasil!");
            } else {
                alert("Login Gagal: " + data.message);
            }
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid h-100 w-100 d-flex flex-column align-items-start justify-content-center">
                    
                    <h1>Register</h1>
                    <div className="d-flex flex-column align-items-start justify-content-center gap-3 w-100">
                        <input type="email" className="form-control" placeholder="Email" id="email_input"/>
                        <input type="text" className="form-control" placeholder="Username" id="username_input"/>
                        <input type="password" className="form-control" placeholder="Password" id="password_input"/>
                        <input type="password" className="form-control" placeholder="Confirm Password" id="confirm_password_input"/>
                        <button type="submit" className="btn btn-primary" onClick={this.postUser}>Register</button>
                    </div>

                </div>
            </>
        );
    }   
}

export default RegisterCard;