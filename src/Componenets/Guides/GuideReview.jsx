import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GuideReview = () => {
    const [reviews, setReviews] = useState([]);

    console.log(reviews);

    useEffect(() => {
        fetch('https://outingbd-server.vercel.app/guidereviews')
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, []);

    return (
        <div className="bg-white p-4">

            <div className='text-center my-10 font-bold text-5xl'>
            <h2 className="text-[#87C342] font-bold text-center text-4xl ">
                Customer Review
            </h2>
                <p className='text-lg font-semibold'>See What our authentic cutomer customer says about our guide</p>
            </div>

            <Carousel showArrows={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
                {reviews.map((review) => (
                    <div key={review.id} className="card h-96 bg-base-100 shadow-xl image-full">
                        <figure>
                            <img src={review.guidePhoto} alt="photo" />
                        </figure>
                        <div className="card-body">
                            <div className='flex gap-4 items-center'>

                                <figure>

                                    <img src={review.userimage} alt="User's Photo" className="h-24 w-20 rounded-full" />
                                </figure>
                                <div>
                                <h2 className="card-title text-white text-4xl text-center">{review.userNmae}</h2>
                                <h2 className="card-title text-white text-xl text-center">{review.userEmail}</h2>
                                </div>
                                
                            </div>


                            <p className='text-3xl font-bold text-white'>Guides Name: {review.guideName}</p>
                            <p className='text-2xl font-bold text-white'> " {review.reviewText}"</p>
                            <p className='text-xl font-bold text-white'>Rating: {review.rating} star</p>
                            <p className='text-xl font-bold text-white'>Date: {review.date}</p>
                            <p className='text-xl font-bold text-white' >Time: {review.time}</p>



                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default GuideReview;
