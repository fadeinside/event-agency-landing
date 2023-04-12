// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updateRippleEffect();
	updatehrefButtons();
	updateBottomMenuMove();
	updateMouseUpMenuBehavior();
});


// Функция обновляет поведение страницы при клике мышью на элементы, связанные с нижним и боковым меню. Если пользователь кликает вне этих элементов, то функция удаляет соответствующие атрибуты bottomBarActive и sideBarActive, которые регулируют отображение меню на странице. Это позволяет скрыть меню, если пользователь кликнул вне его области.
function updateMouseUpMenuBehavior() {
	var allStuff = `[bottomBarActive], [sideBarActive], [modalActive], .dropdown, .dropdown-custom`;
	var allStuffi = allStuff.split(", ");
	var active = "bottomBarActive, sideBarActive, modalActive";
	var activei = active.split(", ");
	$(document).mouseup(function (e) {
		if (!$(allStuff).is(e.target) && $(allStuff).has(e.target).length === 0) {
			$("body").removeClass("cropOnMobile");
			for (var i = 0; i < activei.length; i++) {
				$(allStuffi[i]).attr(activei[i], null);
			}
		}
	});
}

// Эта функция используется для управления отображением нижнего меню в интерфейсе.
function updateBottomMenuMove() {
	// селектор для элементов, на которые будет навешан обработчик событий
	const bottomTarget = "[data-bottombar]";
	// селектор для меню
	const bottomMenu = ".bottombar, .bottombar-custom";
	// название атрибута, который используется для указания активного состояния меню.
	const active = "bottomBarActive";

	// На элемент, соответствующий селектору bottomTarget, устанавливается обработчик событий click, который находит все элементы, у которых атрибут data-for равен значению атрибута data-bottombar кликнутого элемента.
	$(document).on("click", bottomTarget, function () {
		const $clicked = $(this);
		$(`[data-for="${$clicked.data("bottombar")}"]`).each(function () {
			// Затем на каждом найденном элементе нижнего меню вызывается метод attr(), который устанавливает значение атрибута, указанного в переменной active, в null. 
			$(bottomMenu).attr(active, null);

			// После этого определяется, находится ли элемент меню за пределами экрана, и если это так, то меню перемещается.
			const $parent = $(this).parent(".menuTarget");
			const isBehindTheScreen = $parent.length ?
				($parent.position().left + $(this).outerWidth() + 10 >= $(window).outerWidth()) :
				($(this).position().left + $(this).outerWidth() + 10 >= $(window).outerWidth());

			if (isBehindTheScreen) {
				$(this).css({ right: "10px" });
			} else {
				$(this).css({ right: "unset" });
			}

			// Затем на элементе body добавляется класс cropOnMobile, а на элементе меню устанавливается значение атрибута active в true.
			$("body").addClass("cropOnMobile");
			$(this).attr(active, true);
		});
	});
}

// Этот скрипт предназначен для обновления ссылок кнопок. Когда пользователь нажимает на кнопку, которая имеет атрибут href, скрипт сначала получает значение атрибута href и проверяет, не пустое ли оно или не определено. Если ссылка не определена или пуста, то скрипт просто завершает выполнение. В противном случае, скрипт получает значение атрибута target (целевое окно), если оно есть, иначе устанавливает значение по умолчанию - "_self". Затем скрипт открывает новое окно браузера, используя указанную ссылку и целевое окно, и устанавливает на него фокус.
function updatehrefButtons() {
	$("button[href]").click(function () {
		var link = $(this).attr("href");
		if ((link == "") | (link == undefined)) return;
		var target = $(this).attr("target");
		if (!target) target = "_self";
		window.open(link, target).focus();
	});
}

// Эта функция добавляет эффект "ripple" (волна) на кнопки при клике на них. Когда кнопка нажимается, функция определяет положение кнопки на странице и координаты клика. Затем она создает элемент span и добавляет класс "ripple", который задает стили для эффекта волны. Этот элемент span добавляется внутрь кнопки и позиционируется относительно координат клика.
function updateRippleEffect() {
	$(document).ready(function () {
		$("button").on("click", function (e) {
			var offset = $(this).offset();

			var w = $(this).width();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;

			let $span = $("<span/>");
			$span.addClass("ripple");

			$span.css({
				width: w + "px",
				height: w + "px",
				top: y + "px",
				left: x + "px",
			});

			$(this).append($span);

			setTimeout(function () {
				$span.fadeOut("0ms", function () {
					$span.remove();
				});
			}, 3000);
		});
	});
}