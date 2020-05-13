
package views.html

import _root_.play.twirl.api.TwirlFeatureImports._
import _root_.play.twirl.api.TwirlHelperImports._
import _root_.play.twirl.api.Html
import _root_.play.twirl.api.JavaScript
import _root_.play.twirl.api.Txt
import _root_.play.twirl.api.Xml
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

object welcome extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template2[String,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(message: String, style: String = "scala"):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.44*/(""" 

"""),_display_(/*3.2*/defining(play.core.PlayVersion.current)/*3.41*/ { version =>_display_(Seq[Any](format.raw/*3.54*/("""

"""),format.raw/*5.1*/("""<section id="top">
  <div class="wrapper">
    <h1><a href="https://playframework.com/documentation/"""),_display_(/*7.59*/version),format.raw/*7.66*/("""/Home">"""),_display_(/*7.74*/message),format.raw/*7.81*/("""</a></h1>
  </div>
</section>

<div id="content" class="wrapper doc">
<article>

  <h1>Welcome to Play</h1>

  <p>
    Congratulations, you’ve just created a new Play application. This page will help you with the next few steps.
  </p>

  <blockquote>
    <p>
      You’re using Play """),_display_(/*22.26*/version),format.raw/*22.33*/("""
    """),format.raw/*23.5*/("""</p>
  </blockquote>

  <h2>Why do you see this page?</h2>

    <p>
      The <code>conf/routes</code> file defines a route that tells Play to invoke the <code>HomeController.index</code> action
      whenever a browser requests the <code>/</code> URI using the GET method:
    </p>

    <pre><code># Home page
GET     /               controllers.HomeController.index</code></pre>

    <p>
      Play has invoked the <code>controllers.HomeController.index</code> method to obtain the <code>Action</code> to execute:
    </p>

    <pre><code>def index = Action """),format.raw/*40.35*/("""{"""),format.raw/*40.36*/("""
  """),format.raw/*41.3*/("""Ok(views.html.index("Your new application is ready."))
"""),format.raw/*42.1*/("""}"""),format.raw/*42.2*/("""</code></pre>

    <p>
      An action is a function that handles the incoming HTTP request, and returns the HTTP result to send back to the web client.
      Here we send a <code>200 OK</code> response, using a template to fill its content.
    </p>

    <p>
      The template is defined in the <code>app/views/index.scala.html</code> file and compiled as a Scala function.
    </p>

    <pre><code>@(message: String)(implicit assetsFinder: AssetsFinder)

@main("Welcome to Play") """),format.raw/*55.27*/("""{"""),format.raw/*55.28*/("""

    """),format.raw/*57.5*/("""@welcome(message, style = "scala")

"""),format.raw/*59.1*/("""}"""),format.raw/*59.2*/("""</code></pre>

    <p>
      The first line of the template defines the function signature. Here it just takes a single <code>String</code> parameter.
      This template then calls another function defined in <code>app/views/main.scala.html</code>, which displays the HTML
      layout, and another function that displays this welcome message. You can freely add any HTML fragment mixed with Scala
      code in this file.
    </p>

    <p>You can read more about <a href="https://www.playframework.com/documentation/"""),_display_(/*68.86*/version),format.raw/*68.93*/("""/ScalaTemplates">Twirl</a>, the template language used by Play, and how Play handles <a href="https://www.playframework.com/documentation/"""),_display_(/*68.232*/version),format.raw/*68.239*/("""/ScalaActions">actions</a>.</p>

    <h2>Async Controller</h2>

    Now that you've seen how Play renders a page, take a look at <code>AsyncController.scala</code>, which shows how to do asynchronous programming when handling a request.  The code is almost exactly the same as <code>HomeController.scala</code>, but instead of returning <code>Result</code>, the action returns <code>Future[String]</code> to Play.  When the execution completes, Play can use a thread to render the result without blocking the thread in the mean time.

    <p>
        <a href=""""),_display_(/*75.19*/routes/*75.25*/.AsyncController.message),format.raw/*75.49*/("""">Click here for the AsyncController action!</a>
    </p>

    <p>
        You can read more about <a href="https://www.playframework.com/documentation/"""),_display_(/*79.87*/version),format.raw/*79.94*/("""/ScalaAsync">asynchronous actions</a> in the documentation.
    </p>

    <h2>Count Controller</h2>

    <p>
        Both the HomeController and AsyncController are very simple, and typically controllers present the results of the interaction of several services.  As an example, see the <code>CountController</code>, which shows how to inject a component into a controller and use the component when handling requests.  The count controller increments every time you refresh the page, so keep refreshing to see the numbers go up.
    </p>

    <p>
        <a href=""""),_display_(/*89.19*/routes/*89.25*/.CountController.count),format.raw/*89.47*/("""">Click here for the CountController action!</a>
    </p>

    <p>
        You can read more about <a href="https://www.playframework.com/documentation/"""),_display_(/*93.87*/version),format.raw/*93.94*/("""/ScalaDependencyInjection">dependency injection</a> in the documentation.
    </p>

    <h2>Need more info on the console?</h2>

  <p>
    For more information on the various commands you can run on Play, i.e. running tests and packaging applications for production, see <a href="https://playframework.com/documentation/"""),_display_(/*99.187*/version),format.raw/*99.194*/("""/PlayConsole">Using the Play console</a>.
  </p>  

  <h2>Need to set up an IDE?</h2>

  <p>
      You can start hacking your application right now using any text editor. Any changes will be automatically reloaded at each page refresh, 
      including modifications made to Scala source files.
  </p>

  <p>
      If you want to set-up your application in <strong>IntelliJ IDEA</strong> or any other Java IDE, check the 
      <a href="https://www.playframework.com/documentation/"""),_display_(/*111.61*/version),format.raw/*111.68*/("""/IDE">Setting up your preferred IDE</a> page.
  </p>

  <h2>Need more documentation?</h2>

  <p>
    Play documentation is available at <a href="https://www.playframework.com/documentation/"""),_display_(/*117.94*/version),format.raw/*117.101*/("""">https://www.playframework.com/documentation</a>.
  </p>

  <p>
    Play comes with lots of example templates showcasing various bits of Play functionality at <a href="https://www.playframework.com/download#examples">https://www.playframework.com/download#examples</a>.
  </p>

  <h2>Need more help?</h2>

  <p>
    Play questions are asked and answered on Stackoverflow using the "playframework" tag: <a href="https://stackoverflow.com/questions/tagged/playframework">https://stackoverflow.com/questions/tagged/playframework</a>
  </p>

  <p>
    The <a href="https://discuss.playframework.com">Discuss Play Forum</a> is where Play users come to seek help,
    announce projects, and discuss issues and new features.
  </p>

  <p>
    Gitter is a real time chat channel, like IRC. The <a href="https://gitter.im/playframework/playframework">playframework/playframework</a>  channel is used by Play users to discuss the ins and outs of writing great Play applications.
  </p>
 
</article>

<aside>
  <h3>Browse</h3>
  <ul>
    <li><a href="https://playframework.com/documentation/"""),_display_(/*144.59*/version),format.raw/*144.66*/("""">Documentation</a></li>
    <li><a href="https://playframework.com/documentation/"""),_display_(/*145.59*/version),format.raw/*145.66*/("""/api/"""),_display_(/*145.72*/style),format.raw/*145.77*/("""/index.html">Browse the """),_display_(/*145.102*/{style.capitalize}),format.raw/*145.120*/(""" """),format.raw/*145.121*/("""API</a></li>
  </ul>
  <h3>Start here</h3>
  <ul>
    <li><a href="https://playframework.com/documentation/"""),_display_(/*149.59*/version),format.raw/*149.66*/("""/PlayConsole">Using the Play console</a></li>
    <li><a href="https://playframework.com/documentation/"""),_display_(/*150.59*/version),format.raw/*150.66*/("""/IDE">Setting up your preferred IDE</a></li>
    <li><a href="https://playframework.com/download#examples">Example Projects</a>
  </ul>
  <h3>Help here</h3>
  <ul>
    <li><a href="https://stackoverflow.com/questions/tagged/playframework">Stack Overflow</a></li>
    <li><a href="https://discuss.playframework.com">Discuss Play Forum</a> </li>
    <li><a href="https://gitter.im/playframework/playframework">Gitter Channel</a></li>
  </ul>
  
</aside>

</div>
""")))}),format.raw/*163.2*/("""
"""))
      }
    }
  }

  def render(message:String,style:String): play.twirl.api.HtmlFormat.Appendable = apply(message,style)

  def f:((String,String) => play.twirl.api.HtmlFormat.Appendable) = (message,style) => apply(message,style)

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: 2020-05-12T14:48:40.653889
                  SOURCE: /home/ezra/Documents/personal/play-samples-play-scala-starter-example/app/views/welcome.scala.html
                  HASH: 69164ad0a9fe84dbf51f5fb044acf8838b0c72be
                  MATRIX: 738->1|875->43|904->47|951->86|1001->99|1029->101|1156->202|1183->209|1217->217|1244->224|1556->509|1584->516|1616->521|2204->1081|2233->1082|2263->1085|2345->1140|2373->1141|2884->1626|2913->1627|2946->1633|3009->1670|3037->1671|3583->2190|3611->2197|3778->2336|3807->2343|4395->2904|4410->2910|4455->2934|4635->3087|4663->3094|5257->3661|5272->3667|5315->3689|5495->3842|5523->3849|5872->4170|5901->4177|6411->4659|6440->4666|6658->4856|6688->4863|7798->5945|7827->5952|7938->6035|7967->6042|8001->6048|8028->6053|8082->6078|8123->6096|8154->6097|8290->6205|8319->6212|8451->6316|8480->6323|8972->6784
                  LINES: 21->1|26->1|28->3|28->3|28->3|30->5|32->7|32->7|32->7|32->7|47->22|47->22|48->23|65->40|65->40|66->41|67->42|67->42|80->55|80->55|82->57|84->59|84->59|93->68|93->68|93->68|93->68|100->75|100->75|100->75|104->79|104->79|114->89|114->89|114->89|118->93|118->93|124->99|124->99|136->111|136->111|142->117|142->117|169->144|169->144|170->145|170->145|170->145|170->145|170->145|170->145|170->145|174->149|174->149|175->150|175->150|188->163
                  -- GENERATED --
              */
          