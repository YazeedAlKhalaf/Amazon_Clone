import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
          alt="header image"
        />

        <div className="home__row">
          <Product
            id={`131236185486`}
            title="The lean startup book | Book that is great and has a good build quality"
            price={29.99}
            imageUrl={`https://images-na.ssl-images-amazon.com/images/I/51-cYrw1XpL._AC_SY400_.jpg`}
            rating={4}
          />
          <Product
            id={`190760923212`}
            title="Rubick Weird Blocks | For smart and creative people!"
            price={99.99}
            imageUrl={`https://hbr.org/resources/images/article_assets/2020/04/Apr20_07_1162572100.jpg`}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id={`098765431243`}
            title="Kenwoord Blender"
            price={269.58}
            imageUrl={`https://static2.mumzworld.com/media/catalog/product/j/b/jb-183036-kenwood-glass-blender-with-2-mill-silver-1576650664.jpg`}
            rating={2}
          />
          <Product
            id={`79015545423`}
            title="Lambo for sale | Contact my Sercretary for more info!"
            price={999999.99}
            imageUrl={`https://images.outlookindia.com/public/uploads/articles/2019/2/16/lambo_1_20190216_571_855.jpg`}
            rating={3}
          />
          <Product
            id={`09612589445`}
            title="Pencil 12 pieces! Back-to-school sales!"
            price={3.69}
            imageUrl={`https://brightkidz.co.uk/wp-content/uploads/2018/09/bright-pencils-mix-designs-800.jpg`}
            rating={1}
          />
        </div>

        <div className="home__row">
          <Product
            id={`1541236789`}
            title="Big Smasung Smart TV with a lot of capabilities"
            price={999.99}
            imageUrl={`https://images-na.ssl-images-amazon.com/images/I/616%2BK6M825L._AC_SX355_.jpg`}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
