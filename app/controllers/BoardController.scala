package controllers

import javax.inject._

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
class BoardController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  val _board = new Board((1,1))
  /**
   * Creates an Action that returns a plain text message after a delay
   * of 1 second.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/board`.
   */
  def board = Action.async {
    getBoard.map { msg => Ok(msg) }
  }

  implicit val boardWrites = _board.convToJson

  private def getBoard: Future[JsValue] = {
    val promise: Promise[JsValue] = Promise[JsValue]()
    val res: Resource = new Resource("Gold")
    val tile: Tile = new Tile(0, res, 8)
    _board.addTown(new Town(tile, tile, tile, new Player(3, _board)))
    actorSystem.scheduler.scheduleOnce(0.second) {
      promise.success(Json.toJson(_board))
    }(actorSystem.dispatcher)
    promise.future
  }

}
