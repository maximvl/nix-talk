'use strict';

window.reveal_init = function() {
    // Full list of configuration options available here:
    // https://github.com/hakimel/reveal.js#configuration

    var Reveal = window.Reveal;
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme || 'white', // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

        // Parallax scrolling
        // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
        // parallaxBackgroundSize: '2100px 900px',

        // Optional libraries used to extend on reveal.js
        /* dependencies: [
           { src: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.2.0/plugin/highlight/highlight.min.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } } ] */
    });
};

var slides_list = [];

var add_slide = function(header, content) {
    slides_list.push({content: <span><h3>{header}</h3>{content}</span>});
};

add_slide("Функциональный подход к управлению пакетами",
          <img style={{ height: "30%", width: "30%" }} src="http://nixos.org/logo/nixos-logo-only-hires.png" />);

add_slide("Eelco Dolstra",
          <span>
              <img src="http://www.cs.uu.nl/staff/faces/eelco.jpg" /><br />
              The Purely Functional Software Deployment Model. PhD thesis, Faculty of Science, Utrecht, The Netherlands. January 2006. ISBN 90-393-4130-3.
          </span>);

add_slide(
    "Основные проблемы пакетных систем",
    <ul>
        <li>Точное указание зависимостей</li>
        <li>Поиск зависимостей</li>
        <li>Установка нескольких версий</li>
        <li>Откат действий</li>
        <li>Неатомарность обновлений</li>
        <li>Только root ставит пакеты</li>
    </ul>
);

add_slide(
    "Функциональный подход",
    <ul>
        <li>Файловая система ⇔ Память</li>
        <li>Скрипт сборки пакета ⇔ Чистая функция сборки
            <ul>
                <li>Исходные коды компонента</li>
                <li>Все параметры и переменные среды, переданные скрипту</li>
                <li>Все зависимости сборки: компиляторы, линкеры, библиотеки, unix-утилиты, шелл и тд.</li>
            </ul>
        </li>
    </ul>
);

add_slide("",
          <pre>
              <code>
                  max@nixos ~> /bin/cat
                  <br />
                  /bin/cat: command not found
                  <br /><br />
                  max@nixos ~> which cat
                  <br />
                  /run/current-system/sw/bin/cat
                  <br /><br />
                  max@nixos ~> file /run/current-system/sw/bin/cat
                  <br />
                  /run/current-system/sw/bin/cat: symbolic link to /nix/store/9s9r019176g7cvn2nvcw41gsp862y6b4-coreutils-8.24/bin/cat
              </code>
          </pre>
);

add_slide("",
          <pre>
              <code>
                  max@nixos ~> ls /nix/store/9s9r019176g7cvn2nvcw41gsp862y6b4-coreutils-8.24/
                  <br />
                  bin/  libexec/  share/
                  <br /><br />
                  max@nixos ~> sudo rm -f /nix/store/9s9r019176g7cvn2nvcw41gsp862y6b4-coreutils-8.24/bin/cat
                  <br />
                  rm: cannot remove ‘/nix/store/9s9r019176g7cvn2nvcw41gsp862y6b4-coreutils-8.24/bin/cat’: Read-only file system
                  <br /><br />
                  max@nixos ~> mount | grep nix
                  <br />
                  /dev/sda1 on /nix/store type ext4 (ro,relatime,data=ordered)
              </code>
          </pre>
);

add_slide(
    "Функциональный подход",
    <ul>
        <li>Доступны те зависимости, что указаны и только они </li>
        <li>Пути зависимостей высчитываются</li>
        <li>Пакеты не могут влиять друг на друга</li>
        <li>Откат на предыдущие поколения</li>
        <li>Атомарные обновления</li>
        <li>Пользователь устанавливает пакеты</li>
    </ul>
);

add_slide(
    "nixos.org/nix",
    <span>
        <iframe style={{ height:"500px", width:"100%" }} src="http://nixos.org/nix"></iframe>
    <a href="http://nixos.org/docs/papers.html">nixos.org/docs/papers.html</a>
    </span>
);

/* add_slide(
   <span>
   <h2>Проблемы управления</h2>
   <ul>
   <li>Удаление компонента</li>
   <li>Обновление компонента</li>
   <li>Получение информации о компоненте</li>
   <li>Откат обновления</li>
   <li>Возможен деплой в бинарном виде и source-based</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Проблемы бинарных пакетных менеджеров</h2>
   <ul>
   <li>Отсутствие проверки зависимостей при сборке пакета</li>
   <li>Номинальные зависимости</li>
   <li>Деструктивное обновление</li>
   <li>Неатомарное обновление</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Граф зависимостей Firefox</h2>
   <img src="firefox_deps.png" />
   </span>
   );

   add_slide(
   <span>
   <h2>Проблемы source-based пакетных менеджеров</h2>
   <ul>
   <li>Ресурсозатратность</li>
   <li>Наличие compile-time зависимостей у пользователя</li>
   <li>Разобщенность source-based и бинарных пакетов</li>
   <li>Неатомарное обновление</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Проблемы подхода Windows и Mac OS </h2>
   <ul>
   <li>Ручное или полу-ручное получение компонентов</li>
   <li>Ручное обновление компонентов</li>
   <li>Невозможность использовать зависимость совместно</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Проблемы деплоя компонентов</h2>
   <ul>
   <li>Невозможно установить несколько версий компонента</li>
   <li>Компоненты могут мешать друг другу</li>
   <li>Невозможно откатиться на предыдущие состояния</li>
   <li>Обычный пользователь не может работать с пакетной системой</li>
   <li>Трудно/невозможно настраивать компоненты</li>
   <li>Ручное управление компонентами</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Nix</h2>
   <ul>
   <li>Уникальные криптохеши позволяют ставить несколько версий</li>
   <li>Изоляция компонентов предотвращает вмешательство</li>
   <li>Пользователи могут устанавливать компоненты абсолютно независимо</li>
   <li>Откат на предыдущие конфигурации имеет сложность O(1)</li>
   <li>Прозрачная source/binary модель деплоя</li>
   <li>Не навязывает способы распространения компонентов</li>
   </ul>
   </span>
   );

   add_slide(
   <span>
   <h2>Хеш создается из</h2>
   <ul>
   <li>Исходные коды компонента</li>
   <li>Скрипт сборки</li>
   <li>Все параметры и переменные среды, переданные скрипту</li>
   <li>Все зависимости сборки: компиляторы, линкеры, библиотеки, unix-утилиты, шелл и тд.</li>
   </ul>
   </span>
   ); */



console.log(slides_list);

var Slide = React.createClass({
    render: function() {
        console.log('content:', this.props.content);
        return <section>{this.props.content}</section> ;
    }
});

var RevealElement = React.createClass({
    render: function() {
        var slides = slides_list.map(function(item, i) {
            return <Slide content={item.content} header={item.header} key={i} />;
        });

        console.log('slides:', slides);

        return (
            <div className="reveal">
                <div className="slides">
                    {slides}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<RevealElement />, document.body, reveal_init);
