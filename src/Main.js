import "./App.css";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Heart from "./img/heart.png";
import HeartFill from "./img/heart_fill.png";


const Main = (props) => {
	const heart_length = Array.from({ length: 5 }, (v, i) => i);

	// 랜덤 별 생성
	const random_hearts = [];
	for (let i = 0; i < 7; i++) {
		// 1-5사이 숫자 랜덤으로 7개 생성해서 배열에 담기
		random_hearts.push(Math.floor(Math.random() * 5) + 1);
	}

	// 평균 구하기
	const getAverage = (
		random_hearts.reduce((cur, acc) => (cur += acc)) / 7
	).toFixed(2);
	const [average, updateAverage] = React.useState(getAverage);

	return (
		<div className="main">
			<Title>나의 일주일은?</Title>
			<DaysGroup>
				{props.date.map((v, i) => {
					return (
						<li key={i} className="day_item">
							<span className="day">
								{props.days[v]}
								<em style={{ fontSize: "0" }}>{random_hearts[i]}</em>
							</span>
							<ScoreArea>
								<ul className="score">
									{heart_length.map((heart, idx) => {
										return (
											<li key={idx}>
												<img
													src={
														idx + 1 <= random_hearts[i]
															? HeartFill
															: Heart
													}
													alt="heart"
												/>
											</li>
										);
									})}
								</ul>
								<Link to={"/detail/" + props.days_en[v]}>➡</Link>
							</ScoreArea>
						</li>
					);
				})}
			</DaysGroup>
			<Average>
				<p>
					평균 평점<span>{average}</span>
				</p>
			
				<button
					onClick={() => {
						updateAverage(0);
					}}
				>
					리셋하기
				</button>
			</Average>
		</div>
	);
};

const DaysGroup = styled.ul`
	border-top: 1px solid #black;
	& > li {
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		padding: 5px;
		border-bottom: 1px solid #eee;
		.day {
			font-size: 20px;
		}
	}
`;
const Title = styled.h1`
	font-size: 30px;
	margin-bottom: 50px;
`;
const ScoreArea = styled.div`
	.score {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		vertical-align: middle;
		li {
			& + li {
				margin-left: 6px;
			}
		}
	}
	a {
		display: inline-block;
		text-decoration: none;
		font-size: 20px;
		padding: 5px 10px;
		color: red;
		border-radius: 3px;
		margin-left: 10px;
		vertical-align: middle;
	}
`;
const Average = styled.div`
	// display: flex;
	font-size: 20px;
	margin: 10px;
	color: black;
	font-weight: bold;
	padding-top: 40px;
	align-items: center;
	justify-content: center;
	span {
		position: relative;
		display: inline-block;
		font-size: 30px;
		vertical-align: middle;
		margin-top: -4px;
		margin-left: 6px;
		&:before {
			content: "";
			position: absolute;
			left: -3px;
			right: -3px;
			height: 8px;
			bottom: 2px;
			z-index: -1;
		}
	}
	button {
		border: 2px solid pink;
		color: black;
		background-color: pink;
		padding: 5px 15px;
		font-size: 14px;
		border-radius: 3px;
		background: transparent;
		font-weight: 700;
		margin-left: 15px;
		cursor: pointer;
	
	}
`;
export default Main;