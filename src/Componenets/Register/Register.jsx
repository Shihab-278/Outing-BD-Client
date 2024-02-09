
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {

    const [regError, setRegError] = useState('');
    const [success, setSuccess] = useState('');

    const { createUser } = useContext(AuthContext);


    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);
   
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Password Error',
                text: 'Password must be at least 6 characters long',
            });
            return;
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Password Error',
                text: 'Use at least one special character',
            });
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Password Error',
                text: 'Use at least one uppercase letter',
            });
            return;
        }
   
        setRegError('');
        setSuccess('');
   
        // create user in firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully registered!',
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: error.message,
                });
            });
    }
   

    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: 'url("https://i.ibb.co/120z107/s-m-ibrahim-1-NEJki-TTu-LU-unsplash.jpg")', opacity: '0.9' }}>
        <div className="hero-content flex-col">
            <div className="text-center ">
                <h1 className="text-6xl text-[#87C342] font-extrabold">Register now!</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl mb-20 ">
                <div className="card-body glass rounded-lg text-white">
                    <form 
                    onSubmit={handleRegister}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" required className="input input-bordered text-black font-bold" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" required className="input input-bordered text-black font-bold" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type="password" name="password" required placeholder="Password" className="input input-bordered text-black font-bold" />

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#87C342] hover:bg-[#37B3E6]">Register</button>
                        </div>
                    </form>
                    <p> Already have account? <Link to="/login">
                        <button className="btn btn-link text-[#87C342]">Login</button>
                    </Link>here! </p>

                   
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;