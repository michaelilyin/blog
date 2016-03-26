<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html ng-app="webmodule">
<head>
	<base href='<c:url value="/web"/>'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="<c:url value="/resources/css/vsu-demo.min.css"/>">		
	<title>VSU demo application</title>
	<script type="text/javascript">
		document.baseUrl = '<c:url value="/"/>';
	</script>
</head>
<body ng-controller="MainCtrl">
	
	<div id="header" ng-controller="HeaderCtrl" ng-include="'<c:url value="/resources/content/page/header.html"/>'"></div>
	<div class="container-fluid main-container" ui-view ng-cloak></div>
	<div ng-include="'<c:url value="/resources/content/page/footer.html"/>'"></div>

	<script type="text/javascript" src='<c:url value="/resources/js/lib.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/app.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/run.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/directives.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/services.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/resources/js/controllers.min.js"/>'></script>
	<!-- раскоментировать если есть фильтры в папке /resources/js/filter -->
	<%-- <script type="text/javascript" src='<c:url value="/resources/js/filters.min.js"/>'></script> --%>

</body>
</html>