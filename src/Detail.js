import "./App.css";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Heart from "./img/heart.png";
import HeartFill from "./img/heart_fill.png";

const Detail = (props) => {
	const [score, setScore] = React.useState(-1);
	const param = useParams().day;
	const idx = Object.keys(props.days_en).filter(
		(v, i) => props.days_en[i] === param
	);

	const keyupEvent = (e) => { // keyup 이벤트 추가 (숫자로 평점 입력)
		if (0 < e.key && e.key <= 5) {
			setScore(e.key - 1);
		}
	};

	React.useEffect(() => { // keyup 이벤트 연결
		document.addEventListener("keyup", keyupEvent);
		return () => {
			document.removeEventListener("keyup", keyupEvent);
		};
	});

	return (
		<div className="page_detail">
			{score <= -1 ? (
				<Title>
					<span>{props.days[idx]}요일</span> 평점 남기기
				</Title>
			) : (
				<Title>
					<span>{props.days[idx]}요일</span>은 {score + 1}점!{" "}
	
				</Title>
			)}
			<ScoreArea>
				{Array.from({ length: 5 }, (v, i) => {
					return (
						<button
							key={i}
							onClick={() => {
								setScore(i);
							}}
						>
							<img src={i <= score ? HeartFill : Heart} alt="heart"/>
						</button>
					);
				})}
			</ScoreArea>
			<LinkArea>
				<Link to="/">평점 남기기</Link>
			</LinkArea>
		</div>
	);
};

const Title = styled.h1`
	font-size: 25px;
	}
`;
const ScoreArea = styled.div`
	margin: 40px 0;
	button {
		background: none;
		border: none;
		color: #555;
		cursor: pointer;
		& + button {
			margin-left: 10px;
		}
	}
`;
const LinkArea = styled.div`
	a {
		display: inline-block;
		padding: 0 30px;
		line-height: 44px;
		background: pink;
		color: black;
		text-decoration: none;
		font-size: 15px;
		border-radius: 5px;
	}
`;
export default Detail;