import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import BookingDetail from "./features/bookings/BookingDetail";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

//定义和设置queryClient，
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <DarkModeProvider>
      {/* 在app顶部提供queryProvide，使得全局都可以读取到数据，类似redux和context
      API */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* 在顶部添加创建全局样式，使得在任何地方都可以读取这些属性 */}
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* 注意这里是如何将dashboard设置成主页的，更换成index的 */}
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings/:bookingId" element={<BookingDetail />} />
              <Route path="checkin/:bookingId" element={<CheckinBooking />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "var(--color-grey-0)",
              color: "var(--color-grey-900)",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

//TOPIC:项目内容
//NOTE:登陆界面与全局界面
//登陆界面
//Logo，sidebar，header
//header可以显示当前用户头像，名称，可以点击小人按钮修改名称，头像，密码，可以切换白天夜间模式，可以登出
//Sidebar包括：home,bookings,cabins,users,settings
//NOTE:Supabase建立好数据库信息
//NOTE:Home页面
//App的首页应该包括一个仪表板，展示7天，30天和90的重要数据
//最近的booking，销售，签入，以及入住率的统计
//显示当天的booking情况，客人到达出发情况，姓名国籍，需要提供check in或check out按钮，方便工作人员应该可以在这里完成一些任务
//Pie Chart显示停留时间段
//Line Chart来显示一段时间内酒店营收，包括总计和额外（早餐）销售
//NOTE:Booking页面
//app需要一个表格展示所有的booking，显示房号，客户信息，邮箱，还有几天到达，停留时间，停留时间短，状态，付款
//booking的状态可以是全部，未确定的，签入，和签出的，表格必须能够通过这4类检索信息
//表格可以通过付款数量和日期来给检索的信息排序
//当客人到达时，工作人员可以查看订单信息，删除，签入他们的book，这个需要在每个booking后面添加按钮来操作这个
//进入到订单页面，需要显示停留时间，房间信息，时间段，姓名，国籍，人数，email，ID，是否定早餐，是否已经支付。提供check in按钮，删除订单按钮，返回按钮
//进入check in页面，显示和上面一样的信息，并且提供勾选早餐选项，勾选是否支付选项，checkin按钮，返回按钮
//并且提供pagination功能
//NOTE:cabins页面
//一个表格显示所有的cabin图片，房号，capacity，单价，折扣
//提供复制，编辑，删除按钮
//点击编辑时，调出弹窗，可以修改cabin图片，房号，capacity，单价，折扣
//提供添加cabin按钮
//NOTE:Users页面
//创建用户时，可以输入姓名，email，密码
//NOTE:Settings页面
//工作人员可以设置早餐的价格，最短和最长的入住时间，最大入住客人数量

//TOPIC:项目任务（整个项目分为5个部分完成，先1.5倍速快速回顾视频，边看边记录所有的项目任务，然后独立完成一个模块。计划用5天做完，然后整理最后的react笔记。）
//·/*建立项目-----------------------------------------------------*/
//1.用worldwise的router方式建立每一页的routing;
//2.index route
//3.global style
//4.build Applayout：sidebar，header，main
//5.login和*不在applayout之中，其他都在
//6.react icons：heroicons 2
//·/*实现路由-----------------------------------------------------*/
//7.创建supabase通过React Query实现读取remote state
//8.Supabase这里，需要创建user，setting，cabin三个table，每个table中有很多数据（column），最后创建booking需要将user和cabin连接起来，因为booking一定包含了客户和房间的信息。用户在authentication中创建，并且police全部设置为public，在开发过程中不需要authentication就可以直接访问数据。创建avatars和cabin-images bucket
//9.创建apiCabins
//10.通过react query来管理remote state
//11.安装react query
//12.在App顶部创建react query client，在App顶部提供QueryclientProvider，保证整个app都可以接受到react query下载来的数据
//13.安装react query devtools
//14.提供react query dev tools
//·/*载入cabin-----------------------------------------------------*/
//15.在Cabin Table内用useQuery载入数据
//16.Loading Spinner
//17.创建cabinTable，导入cabinrow
//18.创建tableRow
//19.安装date-fns
//20.在apiCabin中创建deleteCabin，查supabase如何删除
//21.使用useMutation实现删除， 并且验证cache的功能、
//22.在app顶部提供toaster，设置toaster
//23.安装react-hot-toast显示成功或者错误信息
//24.在applayout提供styledcontainer
//·/*React Hook Form表单-----------------------------------------------------*/
//创建新的cabin和编辑现有的cabin用同一个createCabinForm，要解决的问题是创建新cabin时表单是空白的，修改时把现有的信息能穿进去。编辑的情况下图片不用再次上传，用是否有ID来区分是create还是edit
//25.临时用useState把createCabinForm放在list最下面
//26.安装React hook form
//27.放入register，定义handlesubmit方程
//28.在apiCabin中定义createCabin，去supabase查如何上传数据
//29.在createCabinForm中定义mutation function
//30.调用mutate提交，重置表格
//31.检测表格输入是否正确
//32.添加required要求和信息
//33.添加表单提交时的错误方程
//34.调用useForm的getValues，来添加特殊的验证
//35.调用formState，来显示错误
//36.创建formRow component，简化表单
//37.完善上传图片的输入栏
//38.定义FileInput为上传文件的styledComponent
//39.在createCabin中定义上传图片的名称和path
//40.去supabase查上传图片的api，完咋安createCabin API
//41.如果cabin成功创建，但是图片上传失败，则删除cabin
//42.创建edit form按钮和功能
//43.用usestate临时toggle form
//44.点击edit时，将当前的cabin信息传入createCabinForm中
//45.在useForm中传入defaultValues，value就会出现在表单中，实现编辑的功能
//46.Apicabin种create和edit的方程是同一个。但是可以通过是edit还是create分别用不同的api
//47.由于在编辑模式下，图片的URL会被传进来，不修改图片时提交直接提交URL，修改图片提交一个filelist，所以要检查是不是有新文件传进来。所以imagePath也会不一样
//48.创建isworking来控制按钮disable
//49.submit handler 方程中上传或者修改的方程也不一样
/*-----------------------------------------------------*/
//·custom hook
//50.创建自定义4个cabin hooks
//51.在mutationFn中传入reset()，解决不能访问reset的问题
/*-----------------------------------------------------*/
//·复制cabin
//52.创建button list
//53.名字变成copy of 。。。
//54.利用createCabin创建dupilcate function
//·settings
//55.创建useSetting custom hook
//56.将form呈现在界面上
//57.将数据作为默认值放到表单上
//58.添加loading spinner
//59.创建update setting hook
//60.使用onBlur event handler
//61.创建update handler function, 提供field和value
//·Modal
//62.AddCabin，添加Modal，添加样式
//63.添加关闭按钮，点击cancel关闭，创建新的cabin也会关闭
//64.修复Modal的样式，设置默认props
//65.使用createPortal将modal显示在body目录下
//66.在addCabin中将Modal转换成compound component
//67.将Modal变成compoun component，一共4步，需要context API，修复样式
//68.点击modal之外实现关闭modal
//69.创建useOutsideClick custom hook
//70.创建确认删除弹窗和编辑弹窗
//71.运用compound component将cabin table变成reusable table
//72.运用render props pattern来规定resuable table的渲染内容
//73.将三个按钮改成三个点的样式，实现modal和menus的嵌套
//·client side filter（数据少）
//74.创建cabintableoperations，三个button，all，no discount，with discount，使用useSearchParams，设置默认为all，设置filteredCabins
//75.refactor filter，使其可以reusable，提供option然后loop over，active prop
//76.sort table，SortBy，给sortby提供options
//·Booking table
//77.创建getBookingsAPI获取全部bookings，并且同时获取cabin和guest的部分信息（.select）
//78.创建booking table的样式，header body
//79.给booking和cabin table添加没数据为空的显示
//80.创建useBookings
//81.上传sample数据
//·API side Filter（数据多）
//82.BookingtableOperations
//83.eq method来只下载特定的数据 gte（greater than equal） lte（less than equal），getBookings接受filter和sortBy两个argument
//84.通过searchParams给getBookings提供filter和sortby的参数
//85.在getbookings内部对query添加筛选选项，来下载不同的数据
//86.对queryKey添加filter实现对filter的监听
//87.实现query的method的灵活使用
//88.利用query.order method实现Sortby的功能
//·Pagination
//89.Table的foot显示pagination，页数，当前页数，按钮
//90.从URL获取当前页数
//91.先实现点按钮pagination跟着变的效果，和更新URL的功能，会后会将URL用searchParams导出到Apibookings中做server side filter
//92.显示的booking数量小于page size时，直接不显示pagination
//93.直接从supabase读取数据的条数
//94.在useBookings和Api实现conditional检索query.range(from, to)
//95.创建cconfig.js
//96.实现上一页和下一页的pre-fetching，在useBookings中实现queryClient.prefetchQuery()
//97.了解一下infinite query for inifinte scroll
//98.复用menus在bookingitem添加三个按钮
/*-----------------------------------------------------*/
//·Checkin and checkout detail page
//99.点击detail之后navigate到booking detail页面，修改routing
//100.创建useBooking，从URL读ID，传入useBooking
//101.为unconfirm booking实现checkin页面，conditional render下拉菜单，修改routing
//102.给checkin添加checkbox，如果已经支付过，自动checkin
//103.useChecking.js来修改checkin状态和支付状态 updatebooking，然后navigate回到home
//104.允许guest添加breakfast check box，condiitional render，早餐的价格时setting提供的
//105.修改下拉菜单使已经checkin的客户可以checkout
//106.创建useCheckout.js
//107.在bookingdetail中同样提供checkout功能
//108.实现delete booking的功能，和delete cabin一样，需要提供确认删除弹窗，创建useDeleteBooking
//109.在bookingDetail中提供删除booking按钮，并且导航到bookingtable， 给mutate function添加onsettled（-1）
/*-----------------------------------------------------*/
//·userlogin功能
//110.创建ApiAuth.js，去supabase查login的api
//111.创建useLogin.js来实现登陆，使用useMutation来登陆，登陆成功就navigate到dashboard，错误就提供弹窗，并且清空账号密码，提供queryClient.setQueryData,将用户数据放进react query cache
//112.在UI中创建protection route，读取authenticated user，在整页显示spinner，如果没有authenticated用户，直接回到登陆页，有authenticated用户，导航到dashboard
//113.创建getCurrentUser() API，从local storage中获取active session，如果没有就返回null，如果有，再次从supabase getUser
//114.创建useUser，提供isloading，user，isAuthenticated
//115.创建logout.jsx,在header添加退出按钮
//116.创建useLogout.js，登陆成功导航到login，从cache移除当前用户queryClient.removeQueries()
//·实现user signup功能
//117.使用reack hook form来完成signup form
//118.检查email
//119.检查password，至少8位
//120.检查repeat是否和password一致
//121.创建handle function
//122.apiAuth signup API，email password options
//123.useSignUp
//124.打开RSL
//·实现Heaader功能
//125.创建Header Menu，包含user，darkmode，logout按钮
//126.创建Useravatar，包含头像和名称，
//127.updateCurrentUser API,去supabase查api，更新用户有两个表格，一个是更新name和avatar，一个是更新密码。需要用同一个API，更新name和Avatar和cabin的那个类似
//128.useUpdateUser
//129.darkMode，需要使用context api，useLocalStorageState
//·实现dashboard
//130.建立dashboard的样式
//131.建立useRecentBookings
//131.建立useRecentStays
//132.完成3个表
//134.useTodayActivity
//135.ErrorBoundary
//136.检查一下老师是怎么修复那三个点的bug的，修复booking ID的bug
/*-----------------------------------------------------*/
/*-----------------------------------------------------*/
//TOPIC:额外的功能
//1.可以尝试在sidebar中添加一个餐厅的选项
//2.可以在checkout那里生成一个可以在退房时生成PDF invoice的功能，并且发给房客
//3.可以实现cabin每天价格都会浮动的效果
//4.可以尝试自己实现Add&Edit Booking的功能
//5.可以尝试在Create User那一页添加一个表格来管理现有的User

//TOPIC:项目任务（原版）
//·Users of the app are hotel employees. They need to be logged into the application to perform tasks
//·New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
//·Users should be able to upload an avatar, and change their name and password
//·App needs a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount
//·Users should be able to update or delete a cabin, and to create new cabins (including uploading a photo)
//·App needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data
//·The booking status can be "unconfirmed" (booked but not yet checked in), "checked in", or "checked out". The table should be filterable by this important status
//·Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price
//·Users should be able to delete, check in, or check out a booking as the guest arrives (no editing necessary for now)
//·Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app
//·On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already
//·Guest data should contain: full name, email, national ID, nationality, and a country flag for easy identification
//·The initial app screen should be a dashboard, to display important information for the last 7, 30, or 90 days:
//· • A list of guests checking in and out on the current day. Users should be able to perform these tasks from here
//· • Statistics on recent bookings, sales, check ins, and occupancy rate
//· • A chart showing all daily hotel sales, showing both "total" sales and "extras" sales (only breakfast at the moment)
//· • A chart showing statistics on stay durations, as this is an important metric for the hotel
//·Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking
//·App needs a dark mode
