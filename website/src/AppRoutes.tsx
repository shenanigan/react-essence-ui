import { Routes, Route } from 'react-router-dom';
import GettingStarted from './pages/getting-started';

import Home from './pages/home';
import { LoaderPage } from './pages/loader/loader-page';
import { ButtonPage } from './pages/button/button-page';
import { ProgressBarPage } from './pages/progress-bar/progress-bar-page';
import { InputPage } from './pages/input/input-page';
import { SwitchPage } from './pages/switch/switch-page';
import { TextAreaPage } from './pages/text-area/text-area-page';
import { CheckBoxPage } from './pages/check-box/check-box-page';
import { RadioPage } from './pages/radio/radio-page';
import { RangePage } from './pages/range/range-page';
import { AlertPage } from './pages/alert/alert-page';
import { DatePickerPage } from './pages/date-picker/date-picker-page';
import { TimePickerPage } from './pages/time-picker/time-picker-page';
import { PanoramaPage } from './pages/panorama/panorama-page';
import { PivotPage } from './pages/pivot/pivot-page';
import { TilePage } from './pages/tile/tile-page';
import { GridPage } from './pages/grid/grid-page';
import { ListPickerPage } from './pages/list-picker/list-picker-page';
import { StackPanelPage } from './pages/stack-panel/stack-panel-page';
import { PagePage } from './pages/page/page-page';

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route path="getting-started" element={<GettingStarted />} />
				<Route path="components">
					<Route path="button" element={<ButtonPage />} />
					<Route path="loader" element={<LoaderPage />} />
					<Route path="progress-bar" element={<ProgressBarPage />} />
					<Route path="input" element={<InputPage />} />
					<Route path="switch" element={<SwitchPage />} />
					<Route path="text-area" element={<TextAreaPage />} />
					<Route path="check-box" element={<CheckBoxPage />} />
					<Route path="radio" element={<RadioPage />} />
					<Route path="range" element={<RangePage />} />
					<Route path="alert" element={<AlertPage />} />
					<Route path="date-picker" element={<DatePickerPage />} />
					<Route path="time-picker" element={<TimePickerPage />} />
					<Route path="panorama" element={<PanoramaPage />} />
					<Route path="pivot" element={<PivotPage />} />
					<Route path="tile" element={<TilePage />} />
					<Route path="grid" element={<GridPage />} />
					<Route path="list-picker" element={<ListPickerPage />} />
					<Route path="stack-panel" element={<StackPanelPage />} />
					<Route path="page" element={<PagePage />} />
				</Route>
			</Route>
		</Routes>
	);
}
