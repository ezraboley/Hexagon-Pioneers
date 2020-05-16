package services

import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import javax.inject._
import Array._
import scala.util.control.Breaks._

@Singleton
class Board @Inject()(_size:Tuple3[Int,Int,Int]) {
  private val towns = new ListBuffer[Town]()
  private var tiles = this.genBoard(_size._1, _size._2, _size._3)
  val size = _size

  implicit val townWrites = (new Town(null, null, null, null)).convToJson

  def addTown(town: Town) = 
    towns += town
  
  def getTowns: List[Town] = towns.toList

  def getTiles: Array[Array[Array[Tile]]] = tiles

  /* TODO basically need a hash for the tile */
  def genNewTileId: Int = 50

  /* TODO add a way to assign resources */
  def genBoard(xLim: Int, yLim: Int, zLim: Int): Array[Array[Array[Tile]]] = {
    val nXLim = -1 * xLim
    val nYLim = -1 * yLim
    val nZLim = -1 * zLim
    // Size needs to be double the limit + 1 because we adjust for negative
    // values, e.g. lim of 3 goes from -3 to 3 needing 7 = (3 * 2 + 1) indexes
    var board = ofDim[Tile]((xLim * 2) + 1, (yLim * 2) + 1, (zLim * 2) + 1)
    for (x <- (nXLim to xLim)) {
      for (y <- (nYLim to yLim)) {
        breakable {
          for (z <- (nZLim to zLim)) {
            if (x + y + z != 0) break;
            // We need to offset it because neg indexing isnt allowed :(
            board(x + xLim)(y + yLim)(z + zLim) = new Tile(this.genNewTileId, new Resource("Stone"), 6, new Point(x,y,z))
          }
        }
      }
    }
    board
  }
  
  def flattenBoard : Array[Tile] = {
    val ret : Array[Tile] = for (tile <- tiles) yield tile
  }

  implicit val posToJson() = new Writes[Array[Array[Array[Tile]]]] {
    def writes(tiles: Array[Array[Array[Tile]]]) = {
      Json.obj(flattenBoard)  
    }
  }

  val convToJson = new Writes[Board] {
    def writes(board: Board) = Json.obj(
      "tiles" ->  genBoard(3,3,3),//board.getTiles,
      "towns"  -> board.getTowns,
      "size"   -> size
    )
  }

}
