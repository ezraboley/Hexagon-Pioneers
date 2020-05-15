package controllers

import javax.inject._
import scala.collection.mutable.ListBuffer

import akka.actor.ActorSystem
import play.api.mvc._
import play.api.libs.json._
import services._
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future, Promise}

/**
 * This controller creates an `Action` that demonstrates how to write
 * simple asynchronous code in a controller. It uses a timer to
 * asynchronously delay sending a response for 1 second.
 *
 * @param cc standard controller components
 * @param actorSystem We need the `ActorSystem`'s `Scheduler` to
 * run code after a delay.
 * @param exec We need an `ExecutionContext` to execute our
 * asynchronous code.  When rendering content, you should use Play's
 * default execution context, which is dependency injected.  If you are
 * using blocking operations, such as database or network access, then you should
 * use a different custom execution context that has a thread pool configured for
 * a blocking API.
 */
@Singleton
class PlayerController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {
  var players = new ListBuffer[Player]()

  /**
   * Creates an Action that returns a plain text message after a delay
   * of 1 second.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/board`.
   */
  def show(id: Int) = Action.async {
    getPlayerInfo(id).map { msg => Ok(msg) }
  }

  def testAddPlayers = {
    val board = new Board((1,1))
    players = new ListBuffer[Player]()
    players += new Player(0, board)
    players += new Player(1, board)
    players += new Player(2, board)
    players += new Player(3, board)
  }

  implicit val playerWrites = (new Player(0, null)).convToJson

  private def getPlayerInfo(id: Int): Future[JsValue] = {
    val promise: Promise[JsValue] = Promise[JsValue]()
    actorSystem.scheduler.scheduleOnce(0.second) {
      testAddPlayers
      try {
        promise.success(Json.toJson(players(id)))
      } catch {
        case e: IndexOutOfBoundsException => promise.success(Json.toJson("ERROR" -> "Invalid User"))
      }
    }(actorSystem.dispatcher)
    promise.future
  }
}
