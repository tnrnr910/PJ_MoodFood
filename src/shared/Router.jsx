import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../page/MainPage';
import DetailPage from '../page/DetailPage';
import ResultPage from '../page/ResultPage';
import SurveyPage from '../page/SurveyPage';
import LayOut from '../layOut/LayOut';
import ErrorPage from '../page/ErrorPage';
import CommentPage from '../page/CommentPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/comment" element={<CommentPage />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
