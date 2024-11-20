import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axiosInstance from "../../api";
import profilePic from "../../assets/profile-pic.png";

const LinkStyled = styled(Link)`
  text-decoration: none;
  ${(props) =>
    props.type === "sm"
      ? ``
      : ` flex-basis: 22%;
  @media screen and (min-width: 1920px) {
    flex-basis: 19%;
  }
  @media screen and (max-width: 1920px) {
    flex-basis: 24%;
  }
  @media screen and (max-width: 1600px) {
    flex-basis: 28%;
  }
  @media screen and (max-width: 1280px) {
    flex-basis: 32%;
  }
  @media screen and (max-width: 992px) {
    flex-basis: 48%;
  }
  @media screen and (max-width: 728px) {
    flex-basis: 100%;
  }`};
`;
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "100%"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  flex-basis: ${(props) => (props.type === "sm" ? "" : "22%")};
  gap: 10px;
`;
const ImageContainer = styled.div`
  width: ${(props) => (props.type === "sm" ? "" : "100%")};
  padding-top: ${(props) => (props.type === "sm" ? "0" : "56.25%")};
  height: ${(props) => (props.type === "sm" ? "auto" : "0px")};
  position: relative;
`;
const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "178px" : "100%")};
  height: ${(props) => (props.type === "sm" ? "104px" : "100%")};
  border-color: #999;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  position: ${(props) => (props.type === "sm" ? "relative" : "absolute")};
  top: 0;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0;
  color: ${({ theme }) => theme.textSoft};
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axiosInstance.get(`users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const handleAddView = async () => {
    const res = await axiosInstance.put(`videos/view/${video._id}`);
  };

  return (
    <LinkStyled to={`/video/${video._id}`} onClick={handleAddView}>
      <Container type={type}>
        <ImageContainer type={type}>
          <Image type={type} src={video.imgUrl} loading="lazy" />
        </ImageContainer>
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img ? channel.img : profilePic}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views * {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </LinkStyled>
  );
};

export default Card;
