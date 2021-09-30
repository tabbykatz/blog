const reportWebVitals = (onPerfPost) => {
  if (onPerfPost && onPerfPost instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfPost);
      getFID(onPerfPost);
      getFCP(onPerfPost);
      getLCP(onPerfPost);
      getTTFB(onPerfPost);
    });
  }
};

export default reportWebVitals;
