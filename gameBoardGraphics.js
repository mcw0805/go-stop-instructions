//$(document).ready(function() {

    /* directory, resources set up */
    const assetsRootDir = './assets';
    const cardImgRootDir = `${assetsRootDir}/converted`;

    const cardImgSrcDict = {
        0: [`${assetsRootDir}/_back.svg`],
        1: [`${cardImgRootDir}/_1_1.svg`, `${cardImgRootDir}/_1_2.svg`, `${cardImgRootDir}/_1_3.svg`, `${cardImgRootDir}/_1_4.svg`],
        2: [`${cardImgRootDir}/_2_1.svg`, `${cardImgRootDir}/_2_2.svg`, `${cardImgRootDir}/_2_3.svg`, `${cardImgRootDir}/_2_4.svg`],
        3: [`${cardImgRootDir}/_3_1.svg`, `${cardImgRootDir}/_3_2.svg`, `${cardImgRootDir}/_3_3.svg`, `${cardImgRootDir}/_3_4.svg`],
        4: [`${cardImgRootDir}/_4_1.svg`, `${cardImgRootDir}/_4_2.svg`, `${cardImgRootDir}/_4_3.svg`, `${cardImgRootDir}/_4_4.svg`],
        5: [`${cardImgRootDir}/_5_1.svg`, `${cardImgRootDir}/_5_2.svg`, `${cardImgRootDir}/_5_3.svg`, `${cardImgRootDir}/_5_4.svg`],
        6: [`${cardImgRootDir}/_6_1.svg`, `${cardImgRootDir}/_6_2.svg`, `${cardImgRootDir}/_6_3.svg`, `${cardImgRootDir}/_6_4.svg`],
        7: [`${cardImgRootDir}/_7_1.svg`, `${cardImgRootDir}/_7_2.svg`, `${cardImgRootDir}/_7_3.svg`,`${cardImgRootDir}/_7_4.svg`],
        8: [`${cardImgRootDir}/_8_1.svg`, `${cardImgRootDir}/_8_2.svg`, `${cardImgRootDir}/_8_3.svg`,`${cardImgRootDir}/_8_4.svg`],
        9: [`${cardImgRootDir}/_9_1.svg`, `${cardImgRootDir}/_9_2.svg`, `${cardImgRootDir}/_9_3.svg`,`${cardImgRootDir}/_9_4.svg`],
        10: [`${cardImgRootDir}/_10_1.svg`, `${cardImgRootDir}/_10_2.svg`, `${cardImgRootDir}/_10_3.svg`, `${cardImgRootDir}/_10_4.svg`],
        11: [`${cardImgRootDir}/_11_1.svg`, `${cardImgRootDir}/_11_2.svg`, `${cardImgRootDir}/_11_3.svg`, `${cardImgRootDir}/_11_4.svg`],
        12: [`${cardImgRootDir}/_12_1.svg`, `${cardImgRootDir}/_12_2.svg`, `${cardImgRootDir}/_12_3.svg`, `${cardImgRootDir}/_12_4.svg`],
    }

    const imageScale = 6;

    // padding division scale
    const gridWidthPaddingScale = 4;
    const gridHeightPaddingScale = 6;

    let baseImg = new Image();
    baseImg.src = cardImgSrcDict[0][0];

    // padding for grid
    var gridLeftRightPadding = (baseImg.width / imageScale) / gridWidthPaddingScale;
    var gridTopBottomPadding = (baseImg.height / imageScale) / gridHeightPaddingScale;

    // actual grid unit
    var gridUnitHeight = baseImg.height / imageScale + 2 * gridTopBottomPadding;
    var gridUnitWidth = baseImg.width / imageScale + 2 * gridLeftRightPadding;

    // heights
    var handCardSectionHeight = gridUnitHeight;
    var collectionCardSectionHeight = gridUnitHeight * 2 - 2 * gridTopBottomPadding;
    var mainGameFloorSectionHeight = gridUnitHeight * 4;

    // y pos
    var opponentHandCardSectionPos = 0;
    var opponentCollectionSectionPos = gridUnitHeight;
    var mainGameFloorSectionPos = opponentCollectionSectionPos + collectionCardSectionHeight;
    var playerCollectionSectionPos = mainGameFloorSectionPos + mainGameFloorSectionHeight;
    var playerHandSectionPos = playerCollectionSectionPos + collectionCardSectionHeight;

    // yPos, height
    var boardSections = {
        0: [opponentHandCardSectionPos, handCardSectionHeight],
        1: [opponentCollectionSectionPos, collectionCardSectionHeight],
        2: [mainGameFloorSectionPos, mainGameFloorSectionHeight],
        3: [playerCollectionSectionPos, collectionCardSectionHeight],
        4: [playerHandSectionPos, handCardSectionHeight]
    };



    let colors = ['green', 'blue', 'orange', 'blue', 'green'];    
    
    function createSvgElement(body, divId) {
        let divFloor = body.select(`#${divId}`);
        let newSvgElement = divFloor.append('svg')
                                    .attr('xmlns', 'http://www.w3.org/2000/svg')
                                    .attr('xmlns:xlink','http://www.w3.org/1999/xlink')
                                    .attr('width', '100%')
                                    .attr('viewBox', '0 0 300 316')
                                    .attr('preserveAspectRatio','none' );
        
        newSvgElement.append('defs');

        return newSvgElement;
    }
    
    function drawFloorSections(svgElement, floorDiv) {
        let g = svgElement.append('g').attr('class', 'floorSectionRectG');

        for (let i = 0; i < 5; i++) {
            g.append('rect')
            .attr('x', 0)
            .attr('y', boardSections[i][0])
            .attr('width', floorDiv.style('width'))
            .attr('height', boardSections[i][1])
            .attr('fill', colors[i]);
        }
    }

    function drawFloorCard(svgElement, cardPatternId, floorPos=1, cardPosWithin=0, groupIdSuffix="") {
        let floorCords = getFloorCoordinate(svgElement, floorPos, cardPosWithin);
        let floorPosX = floorCords['f_x'];
        let floorPosY = floorCords['f_y'];
        let mainFloorG = svgElement.select(`#centerDeckG${groupIdSuffix}`);
        let groupId = cardPatternId + 'g' + groupIdSuffix;
        drawCardAsGroup(mainFloorG, floorPosX, floorPosY, cardPatternId, groupId, groupIdSuffix);

        
    }

    function getFloorCoordinate(svgElement, floorPos=1, cardPosWithin=0) {
        let centerCoord = getCenterCoord(svgElement);
        let centerX = centerCoord['x'];
        let centerY = centerCoord['y'];
        let xFloorCardPadding = gridLeftRightPadding * 8;
        let yFloorCardPadding = gridTopBottomPadding;

        let floorPosX = centerX;
        let floorPosY = centerY;

        // start with pos 1 and update accordingly
        let xShiftDistFromCenter = (baseImg.width / imageScale / 2 +  + baseImg.width / imageScale);
        // |half height of card + padding + full card|
        let yShiftDistFromCenter = (baseImg.height / imageScale / 2 + yFloorCardPadding + baseImg.height / imageScale);

        if (floorPos == 1 || floorPos == 4 || floorPos == 6) {
            xShiftDistFromCenter = (baseImg.width / imageScale / 2 + xFloorCardPadding + baseImg.width / imageScale) ;
            floorPosX = centerX - xShiftDistFromCenter;
            

        } else if (floorPos == 2 || floorPos == 7) {
            xShiftDistFromCenter = (baseImg.width / imageScale / 2);
            floorPosX = centerX - xShiftDistFromCenter;

        } else if (floorPos == 3 || floorPos == 5 || floorPos == 8) {
            xShiftDistFromCenter = (baseImg.width / imageScale / 2) + xFloorCardPadding;
            floorPosX = centerX + xShiftDistFromCenter;
        } 

        if (floorPos == 1 || floorPos == 2 || floorPos == 3) {
            yShiftDistFromCenter = (baseImg.height / imageScale / 2 + yFloorCardPadding + baseImg.height / imageScale);
            floorPosY = centerY - yShiftDistFromCenter;
        } else if (floorPos == 4 || floorPos == 5) {
            yShiftDistFromCenter = baseImg.height / imageScale / 2;
            floorPosY = centerY - yShiftDistFromCenter;
        } else if (floorPos == 6 || floorPos == 7 || floorPos == 8) {
            yShiftDistFromCenter = baseImg.height / imageScale / 2 + yFloorCardPadding;
            floorPosY = centerY + yShiftDistFromCenter;
        }
        floorPosX += cardPosWithin * baseImg.width / imageScale / 2;

        return {'f_x' : floorPosX, 'f_y': floorPosY};
    }
 
    function getCenterCoord(svgElement) {
        let centerX = svgElement.node().getBBox().width / 2 ;
        let centerY = svgElement.node().getBBox().height / 2 ;
        return {'x': centerX, 'y':centerY};
    }

    function drawCenterRemainingDeck(svgElement, groupIdSuffix='') {

        let centerX = svgElement.node().getBBox().width / 2 - baseImg.width / imageScale / 2;
        let centerY = svgElement.node().getBBox().height / 2 - baseImg.height / imageScale / 2;
        let centerDeckG = svgElement.append('g').attr('id', 'centerDeckG' + groupIdSuffix);
        drawCardAsGroup(centerDeckG, centerX, centerY, 'back', 'backg', groupIdSuffix);

    }

    // for opponent
    // card always flipped over
    function drawHandCardFaceDownSvg(svgElement, numCards=10, startPosX=gridLeftRightPadding, startPosY=gridTopBottomPadding) {
        let opponentCardG = svgElement.append('g')
                .attr('class', 'opponentCards');
        for (let i = 0; i < numCards; i++) {
            opponentCardG.append('svg:image')
                        .attr('xlink:href', cardImgSrcDict[0][0]) // backcard
                        .attr('x', startPosX + i * (baseImg.width / imageScale + gridLeftRightPadding))
                        .attr('y', startPosY)
                        .attr('width', baseImg.width / imageScale)
                        .attr('height', baseImg.height / imageScale);
        }
    }

    // for current player
    // assume card pattern is already added!!!
    function drawHandCardForCurrPlayer(svgElement, cardPatternId, position=0, groupIdSuffix="") {
        let startPosX = gridLeftRightPadding + position * (baseImg.width / imageScale + gridLeftRightPadding);
        let startPosY = handCardSectionHeight + collectionCardSectionHeight * 2 + mainGameFloorSectionHeight + gridTopBottomPadding;
        let groupId = cardPatternId + 'g' + groupIdSuffix;
        drawCardAsGroup(svgElement, startPosX, startPosY, cardPatternId, groupId, groupIdSuffix);
    }

    // for either player
    // assume card pattern is already added!!!
    function drawCollectionCard(svgElement, rank, cardPatternId, cardPosWithin=0, currPlayer=false, piLevel=0, groupIdSuffix="") {

        let cPos = getCollectionCardPos(rank, cardPosWithin, piLevel, currPlayer);
        let startPosX = cPos['c_x'];
        let startPosY = cPos['c_y'];

        let groupId = cardPatternId + 'g' + groupIdSuffix;

        drawCardAsGroup(svgElement, startPosX, startPosY, cardPatternId, groupId, groupIdSuffix);
    }

    function getCollectionCardPos(rank, cardPosWithin=0, piLevel=0, currPlayer=true) {
        let startPosX = gridLeftRightPadding;
        let startPosY = (handCardSectionHeight +  baseImg.height / imageScale / 2 + gridTopBottomPadding); // where kwang starts on opponent side
        
        if (rank == 0) { // kwang
            startPosX = gridLeftRightPadding;
            startPosY = handCardSectionHeight +  baseImg.height / imageScale / 2 + gridTopBottomPadding;
            
        } else if (rank == 1) { // yeol
            startPosX = 5 * baseImg.width / imageScale / 2 + 2.5 * gridUnitWidth + gridLeftRightPadding;
            startPosY = handCardSectionHeight + gridTopBottomPadding;
            
        } else if (rank == 2) { // ribbon
            startPosX = 5 * baseImg.width / imageScale / 2 + 2.5 * gridUnitWidth + gridLeftRightPadding;
            startPosY = handCardSectionHeight + baseImg.height / imageScale + gridTopBottomPadding ;
        } else if (rank == 3) { // pi
            startPosX = 5 * baseImg.width / imageScale / 2 + 6.5 * gridUnitWidth ;
            startPosY = handCardSectionHeight + baseImg.height / imageScale + gridTopBottomPadding ;
            if (piLevel > 0) {
                startPosY -= baseImg.height / imageScale;
            }
        }

        if (currPlayer) { // for curr player -> just shift down
            startPosY += (collectionCardSectionHeight + mainGameFloorSectionHeight);
        }

        if (cardPosWithin > 0) {
            startPosX += cardPosWithin * baseImg.width / imageScale / 2;
        }

        return {'c_x':startPosX, 'c_y':startPosY};
    }

    function addAllCardsAsPattern(divId, groupIdSuffix='') {

        addCardImgAsPattern(divId, cardImgSrcDict[0][0], `back${groupIdSuffix}`);

        for (let i = 1; i <= 12; i++) {
            let monthNum = i;
            for (let cardNum = 1; cardNum <= 4; cardNum++) {
                let patId = `_${monthNum}_${cardNum}${groupIdSuffix}`;
                addCardImgAsPattern(divId, cardImgSrcDict[monthNum][cardNum - 1], patId);
            }
            
        }
    }

    // appends a pattern to a particular div def
    function addCardImgAsPattern(divId, imgSrc=baseImg.src, id) {
        console.log('xxx')
        d3.select(`#${divId} defs`)
            .append('pattern')
            .attr('id', id)
            .attr('width', baseImg.width / imageScale)
            .attr('height', baseImg.height / imageScale)
            .append('svg:image')
            .attr('xlink:href', imgSrc)
            .attr('width', baseImg.width / imageScale)
            .attr('height', baseImg.height / imageScale);

    }

    function drawCardAsGroup(svgElement, x, y, patternId, groupId, groupIdSuffix='', width=(baseImg.width/imageScale), height=(baseImg.height/imageScale)) {
        let g = svgElement.append('g').attr('id', groupId);
                            g.append('rect')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('width', width)
                            .attr('height', height)
                            .style('fill', `url(#${patternId}${groupIdSuffix})`); 

                        

    }

    function blinkCardGroup(cardId, groupIdSuffix='') {
        d3.select(`#${cardId}g${groupIdSuffix}`).transition().on('start', blink);
    }

    function outlineCardGroup(cardId, groupIdSuffix='',color='lime') {
        d3.select(`#${cardId}g${groupIdSuffix}`).style('stroke', color);
    }

    function translateG(cardId, groupIdSuffix='',toX, toY) {
        d3.select(`#${cardId}g${groupIdSuffix} rect`).transition().attr('x', toX).attr('y', toY);
    }



    function blink(color='lime') {
        let thisEl = d3.select(this);
        thisEl.transition()
                .duration(1500)
                .style('stroke', color)
                .transition()
                .duration(1500)
                .style('stroke', 'none')
                .on('end', blink);
    }


//});
