import React from 'react';
import {useLoaderData, useNavigate, useParams, useSearchParams} from 'react-router-dom';

const withRouter = WrappedComponent => props => {
  const loaderData = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
      <WrappedComponent
          {...props}
          loaderData={loaderData}
          navigate = {navigate}
          params = {params}
          searchParams = {searchParams}
      />
  );
};

export default withRouter;