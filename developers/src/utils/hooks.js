export const useCheckMobile = (state) => {
  state.isMobile = document.documentElement.clientWidth < 769;
  window.onresize = () => {
    state.isMobile = document.documentElement.clientWidth < 769;
  };
};
