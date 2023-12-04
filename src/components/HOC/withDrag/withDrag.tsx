const withDrag = (Component: React.ComponentType) => {
  const WithDrag: React.FC = () => {
    return <Component />;
  };

  return WithDrag;
};

export default withDrag;
