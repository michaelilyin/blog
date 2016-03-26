<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html ng-app="webmodule">
<head>
	<base href='<c:url value="/web"/>'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	
	<link rel="stylesheet" href="<c:url value="/resources/css/main.css"/>">
	<link rel="stylesheet" href="<c:url value="/resources/lib/bootstrap/css/bootstrap.min.css"/>">
	<link rel="stylesheet" href="<c:url value="/resources/lib/bootstrap/css/bootstrap-datetimepicker.min.css"/>">
	
	<title>VSU demo application</title>
	<script type="text/javascript">
			document.baseUrl = '<c:url value="/"/>';
	</script>
</head>
<body ng-controller="MainCtrl">
	
	<div id="header" ng-controller="HeaderCtrl" ng-include="'<c:url value="/resources/content/page/header.html"/>'"></div>
	<div class="container-fluid main-container" ui-view></div>
	<div ng-include="'<c:url value="/resources/content/page/footer.html"/>'"></div>

	<script type="text/javascript" src='<c:url value="/resources/lib/moment/moment-with-locales.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/jquery/jquery-2.1.4.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/jquery/jquery-ui.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/bootstrap/js/bootstrap.min.js"/>'></script>

	<script type="text/javascript" src='<c:url value="/resources/lib/angular/angular.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/sanitize.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/angular-route.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/angular-ui-router.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/angular-breadcrumb.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/lodash.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/restangular.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/smart-table.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/bootstrap/ui-bootstrap-tpls-0.14.3.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/angular/angular-local-storage.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/lib/bootstrap/js/bootstrap-datetimepicker.min.js"/>'></script>
	
	<script type="text/javascript" src='<c:url value="/resources/js/app.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/run.js"/>'></script>

	<script type="text/javascript" src='<c:url value="/resources/filters/commonFilters.js"/>'></script>

	<script type="text/javascript" src='<c:url value="/resources/directives/utils/markupUtils.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/modal/draggableModal.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/modal/centerModal.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/table/tableMenu.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/table/table.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/table/stExtensions.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/loader/loader.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/tooltip/tooltip.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/confirm/confirmClick.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/directives/datetimepicker/dateTimePicker.js"/>'></script>
	
	<script type="text/javascript" src='<c:url value="/resources/js/service/util/ModalService.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/service/util/GridService.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/service/DemoService.js"/>'></script>
	
	<script type="text/javascript" src='<c:url value="/resources/content/MainCtrl.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/content/page/HeaderCtrl.js"/>'></script>
	
	<script type="text/javascript" src='<c:url value="/resources/content/index/IndexCtrl.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/content/stub/StubModalCtrl.js"/>'></script>
	
	<script type="text/javascript" src='<c:url value="/resources/content/demo/DemoTableCtrl.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/content/demo/EditDemoCtrl.js"/>'></script>

</body>
</html>