import { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import './Home.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

function Home() {
    const [category, setCategory] = useState("All");

    return (
        <div className='home'>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    );
}

export default Home;
