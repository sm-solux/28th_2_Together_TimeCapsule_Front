import React, { useEffect, useRef, useState } from 'react';
import '../styles/style-home.css';
import { capsule, cap_shadow, ic_list, ic_addpost } from '../assets/index.js';
import { BasicButton } from '../components/index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { count_unchecked, post_user } from '../redux/modules/user.js';
import { reset_capsule } from '../redux/modules/capsule.js';

const Home = () => {
  const navigate = useNavigate();
  const countRef = useRef();

  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(count_unchecked());
  }, [userInfo.uncheckedCount]);

  // Check if userInfo is available before rendering
  if (userInfo) {
    return (
      <div className="home-container">
        <div className="greeting">
          <h2>안녕하세요,</h2>
          <h2>
            <span>{userInfo.name}</span>&nbsp;님
          </h2>
        </div>
        <div className="cap-div">
          {/* <div className="cap-txt-area">
            <p>도착한 캡슐</p>
            <p ref={countRef}>{userInfo.uncheckedCount}</p>
          </div> */}
          <div className="cap-img-area">
            <div className="uncheckedCount-container">
              <div className="uncheckedCount-txt">
                <div>도착한 캡슐</div>
                <div ref={countRef}>{userInfo.uncheckedCount}</div>
              </div>
            </div>
            <img src={capsule}></img>
            <img src={cap_shadow} id="shadow" />
          </div>
        </div>
        <div className="btn-row-div">
          <BasicButton onClick={() => navigate('/capsulelist')}>
            <img src={ic_list} className="ic"></img>
            <p>전체보기</p>
          </BasicButton>
          <BasicButton
            onClick={() => {
              dispatch(reset_capsule());
              navigate('/create');
            }}
          >
            <img src={ic_addpost} className="ic"></img>
            <p>새로운 캡슐 전송</p>
          </BasicButton>
        </div>
      </div>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default Home;
