import React from 'react';
import { withRouter } from 'react-router-dom';

import { MenuItemContainer, ContentContainer, BackgroundImageContainer, Title, SubTitle, } from './menu-item.styles'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className='background-image'
     imageUrl={imageUrl}
    />
    <ContentContainer className='content'>
      <Title>{title.toUpperCase()}</Title>
      <SubTitle>SHOP NOW</SubTitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
