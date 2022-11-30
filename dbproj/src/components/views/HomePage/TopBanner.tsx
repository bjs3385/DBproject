import React, { useEffect } from "react";
import "./TopBanner.css"

//.topArea__statelogon { position:absolute; right:0; top:28px; }
//.topArea__statelogon a { display:inline-block; margin-left:25px; font-family: Arial; font-size:12px; color:#1e1e1e; text-transform:uppercase; text-decoration:none; }

//.topArea__statelogon Box { display:inline-block; min-width:24px; margin: 0 0 0 6px; padding:3px 4px 3px; font-size:13px; text-align:center; border:1px solid #000; border-radius:20px; box-sizing:border-box; }
//<div className={styles.box}></div>

const TopBanner = () => {
    return (
        <div>
            <div className="TopBanner">
                <img className="TopBanner-img" src="https://aioli2017.wisacdn.com/data/base/banner/202211118c8ef457bb774bcbbd35ef17c9580c4aamall_ml_11_1Main_PC.jpg"></img>
                <div className="TopBanner-here">
                    <h2 className="TopBanner-text">WINTER FASHION COLLECTION</h2>
                    <a href="/product/list.html?cate_no=24" className="button">shop now</a>
                </div>  
            </div>
            <section className = "collection">
                <div className="collection-item">
                    <a href="/product/list.html?cate_no=24">
                        <picture>
                            <source srcSet="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection1.webp" type="image/webp" />
                            <img src="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection1.jpg" width="100%" height="100%" alt="banner1" />
                        </picture>
                    </a>
                </div>
                <div className="collection-item">
                    <a href="/product/list.html?cate_no=24">
                        <picture>
                            <source srcSet="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection2.webp" type="image/webp" />
                            <img src="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection2.jpg" width="100%" height="100%" alt="banner2" />
                        </picture>
                    </a>
                </div>
                <div className="collection-item col-item3">
                    <a href="/product/list.html?cate_no=24">
                        <picture>
                            <source srcSet="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection3.webp" type="image/webp" />
                            <img src="//img.echosting.cafe24.com/skin/skin_ko_KR/main/img_collection3.jpg" width="100%" height="100%" alt="banner3" />
                        </picture>
                    </a>
                </div>
            </section>
        </div>

        
    );
}
export default TopBanner;